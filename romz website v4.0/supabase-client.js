const SUPABASE_URL = 'https://nqfamcosztmvieulwzhf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GiNUQ9hbxE12nK4gzmMZ8A_pPy6pbR7';

const { createClient } = window.supabase;
const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DB = {
  async signIn(email, password) {
    const { data, error } = await supa.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },
  async signOut() { await supa.auth.signOut(); },
  async isAdmin() {
    const { data } = await supa.auth.getUser();
    return data?.user?.user_metadata?.role === 'admin';
  },
  async loadProducts() {
    const { data, error } = await supa.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(this._mapProduct);
  },
  async createProduct(p) {
    const { data, error } = await supa.from('products').insert({
      code: p.code, name: p.name, description: p.description || '', price: Number(p.price),
      category: p.category, badge: p.badge || '', stock: Number(p.stock) || 0,
      sizes: p.sizes || [], images: p.images || [], featured: p.featured || 5
    }).select().single();
    if (error) throw error;
    return this._mapProduct(data);
  },
  async updateProduct(id, patch) {
    const { data, error } = await supa.from('products').update(patch).eq('id', id).select().single();
    if (error) throw error;
    return this._mapProduct(data);
  },
  async deleteProduct(id) {
    const { error } = await supa.from('products').delete().eq('id', id);
    if (error) throw error;
  },
  async decrementStock(id, qty) {
    const { error } = await supa.rpc('decrement_stock', { product_id: id, qty });
    if (error) console.warn('decrement_stock:', error.message);
  },
  _mapProduct(p) {
    return {
      id: p.id, code: p.code, name: p.name, description: p.description || '', price: p.price,
      category: p.category, badge: p.badge || '', stock: p.stock, sizes: p.sizes || [],
      images: p.images || [], image: (p.images && p.images[0]) || '', featured: p.featured
    };
  },
  async loadOrders() {
    const { data, error } = await supa.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(o => ({
      id: o.order_code, dbId: o.id, date: new Date(o.created_at).toLocaleString('uz-UZ'),
      timestamp: o.created_at, customer: o.customer_name, phone: o.customer_phone,
      address: o.customer_address, items: o.items || [], total: Number(o.total),
      discount: Number(o.discount || 0), promo: o.promo_code, status: o.status
    }));
  },
  async createOrder(o) {
    const { data, error } = await supa.from('orders').insert({
      order_code: o.id, customer_name: o.customer, customer_phone: o.phone,
      customer_address: o.address, items: o.items, total: o.total,
      discount: o.discount || 0, promo_code: o.promo || null, status: o.status || 'Kutilmoqda'
    }).select().single();
    if (error) throw error;
    return data;
  },
  async updateOrderStatus(dbId, status) {
    const { error } = await supa.from('orders').update({ status }).eq('id', dbId);
    if (error) throw error;
  },
  async deleteOrder(dbId) {
    const { error } = await supa.from('orders').delete().eq('id', dbId);
    if (error) throw error;
  },
  async loadHero() {
    const { data, error } = await supa.from('hero').select('*').eq('id', 1).single();
    if (error) return { productCode: null, badge: 'Haftaning sarasi' };
    return { productCode: data.product_code, badge: data.badge || 'Haftaning sarasi' };
  },
  async saveHero(productCode, badge) {
    const { error } = await supa.from('hero').upsert({ id: 1, product_code: productCode, badge: badge, updated_at: new Date().toISOString() });
    if (error) throw error;
  },
  async uploadImage(file) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `products/${fileName}`;
    const { error } = await supa.storage.from('product-images').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data: { publicUrl } } = supa.storage.from('product-images').getPublicUrl(path);
    return publicUrl;
  },
  onNewOrder(callback) {
    return supa.channel('orders-realtime').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => callback(payload.new)).subscribe();
  }
};

window.DB = DB;