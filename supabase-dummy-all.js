require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Helper functions
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randomInt(0, arr.length - 1)];

const insertDummyData = async () => {
  try {
    console.log('🚀 Connected to Supabase');

    // ---------- USERS ----------
    const roles = ['chef', 'admin', 'customer'];
    const usersData = [];
    for (let i = 1; i <= 50; i++) {
      usersData.push({ name: `User${i}`, email: `user${i}@example.com`, role: pick(roles) });
    }
    await supabase.from('users').delete().neq('id', 0);
    const { data: users, error: usersError } = await supabase.from('users').insert(usersData).select();
    if (usersError || !users || users.length === 0) {
      console.error('❌ Users insert failed:', usersError);
      return;
    }
    console.log('✅ Users inserted:', users.length);

    // ---------- RESTAURANTS ----------
    const restaurantsData = [];
    for (let i = 1; i <= 20; i++) {
      restaurantsData.push({
        name: `Restaurant${i}`,
        description: `Best dishes at Restaurant${i}`,
        image_url: `https://picsum.photos/seed/rest${i}/400/300`
      });
    }
    await supabase.from('restaurants').delete().neq('id', 0);
    const { data: restaurants, error: restError } = await supabase.from('restaurants').insert(restaurantsData).select();
    if (restError) console.error('❌ Restaurants insert failed:', restError);
    console.log('✅ Restaurants inserted:', restaurants.length);

    // ---------- MENU ITEMS ----------
    const menuNames = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad', 'Taco', 'Steak', 'Curry', 'Soup', 'Sandwich'];
    const menuData = [];
    for (let i = 0; i < 200; i++) {
      const restaurant = pick(restaurants);
      menuData.push({
        restaurant_id: restaurant.id,
        name: `${pick(menuNames)} ${i + 1}`,
        description: `Delicious ${pick(menuNames)} number ${i + 1}`,
        price: randomInt(5, 25),
        image_url: `https://picsum.photos/seed/menu${i}/200/150`
      });
    }
    await supabase.from('menu_items').delete().neq('id', 0);
    const { data: menuItems, error: menuError } = await supabase.from('menu_items').insert(menuData).select();
    if (menuError) console.error('❌ Menu insert failed:', menuError);
    console.log('✅ Menu items inserted:', menuItems.length);

    // ---------- MEDIA ----------
    const mediaTypes = ['image', 'audio'];
    const mediaData = [];
    for (let i = 0; i < 100; i++) {
      const user = pick(users);
      const type = pick(mediaTypes);
      mediaData.push({
        user_id: user.id,
        type,
        url: type === 'image'
          ? `https://picsum.photos/seed/media${i}/100/100`
          : `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${randomInt(1, 10)}.mp3`,
        description: `Dummy ${i + 1}`
      });
    }
    await supabase.from('media').delete().neq('id', 0);
    const { data: media, error: mediaError } = await supabase.from('media').insert(mediaData).select();
    if (mediaError) console.error('❌ Media insert failed:', mediaError);
    console.log('✅ Media items inserted:', media.length);

    // ---------- CHAT HISTORY ----------
    const chatData = [];
    for (let i = 0; i < 500; i++) {
      const user = pick(users);
      const menuItem = pick(menuItems);
      chatData.push({
        user_id: user.id,
        message: `Hi, I want to order ${menuItem.name}`,
        response: `Sure, ${menuItem.name} added to your order`
      });
    }
    await supabase.from('chat_history').delete().neq('id', 0);
    const { data: chats, error: chatError } = await supabase.from('chat_history').insert(chatData).select();
    if (chatError) console.error('❌ Chat insert failed:', chatError);
    console.log('✅ Chat history inserted:', chats.length);

    // ---------- ORDERS ----------
    const ordersData = [];
    for (let i = 0; i < 100; i++) {
      const user = pick(users);
      const restaurant = pick(restaurants);
      const items = [];
      for (let j = 0; j < randomInt(1, 3); j++) {
        const menuItem = pick(menuItems.filter(m => m.restaurant_id === restaurant.id));
        if (menuItem) items.push({ item: menuItem.name, qty: randomInt(1, 3) });
      }
      if (items.length === 0) continue;
      const total = items.reduce((sum, it) => sum + it.qty * randomInt(5, 25), 0);
      ordersData.push({
        user_id: user.id,
        restaurant_id: restaurant.id,
        items: JSON.stringify(items),
        total,
        status: pick(['pending', 'preparing', 'completed'])
      });
    }
    await supabase.from('orders').delete().neq('id', 0);
    const { data: orders, error: ordersError } = await supabase.from('orders').insert(ordersData).select();
    if (ordersError) console.error('❌ Orders insert failed:', ordersError);
    console.log('✅ Orders inserted:', orders.length);

    console.log('🎉 All dummy data inserted successfully!');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
};

// Jalankan langsung
insertDummyData();

// Refresh setiap 5 menit (opsional)
setInterval(() => {
  console.log('\n🔄 Refreshing dummy data...');
  insertDummyData();
}, 5 * 60 * 1000);
