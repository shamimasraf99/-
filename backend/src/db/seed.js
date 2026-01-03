const db = require('../models');
const User = db.User;
const Project = db.Project;
const Lead = db.Lead;
const InventoryItem = db.InventoryItem;

const initialData = {
    users: [
        { name: 'ডেমো এডমিন', email: 'admin@demo.com', password: '12345678', role: 'অ্যাডমিন', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/100' },
        { name: 'ফারিহা আক্তার', email: 'fariha@example.com', password: 'password', role: 'ম্যানেজার', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1011/200' },
        { name: 'জাহিদ হাসান', email: 'jahid@example.com', password: 'password', role: 'কর্মী', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1012/200' },
        { name: 'সাদিয়া সুলতানা', email: 'sadia@example.com', password: 'password', role: 'কর্মী', status: 'নিষ্ক্রিয়', avatarUrl: 'https://picsum.photos/id/1027/200' },
        { name: 'রাকিবুল ইসলাম', email: 'rakib@example.com', password: 'password', role: 'কর্মী', status: 'সক্রিয়', avatarUrl: 'https://picsum.photos/id/1040/200' },
    ],
    projects: [
        { name: 'ইআরপি সিস্টেম ডেভেলপমেন্ট', status: 'চলমান', progress: 75, team: ['https://picsum.photos/id/1005/32', 'https://picsum.photos/id/1011/32', 'https://picsum.photos/id/1012/32'], dueDate: 'আগস্ট ৩১, ২০২৪' },
        { name: 'মোবাইল অ্যাপ ডিজাইন', status: 'সম্পন্ন', progress: 100, team: ['https://picsum.photos/id/1027/32', 'https://picsum.photos/id/1040/32'], dueDate: 'জুন ১৫, ২০২৪' },
        { name: 'মার্কেটিং ওয়েবসাইট রিব্র্যান্ডিং', status: 'চলমান', progress: 40, team: ['https://picsum.photos/id/1011/32', 'https://picsum.photos/id/1040/32'], dueDate: 'সেপ্টেম্বর ৩০, ২০২৪' },
        { name: 'API ইন্টিগ্রেশন', status: 'হোল্ড', progress: 90, team: ['https://picsum.photos/id/1012/32'], dueDate: 'জুলাই ২০, ২০২৪' },
        { name: 'সার্ভার মাইগ্রেশন', status: 'বাতিল', progress: 20, team: ['https://picsum.photos/id/1005/32'], dueDate: 'মে ৩০, ২০২৪' },
    ],
    leads: [
        { title: 'নতুন ওয়েবসাইট ডিজাইন', company: 'এবিসি কর্পোরেশন', value: 150000, ownerAvatar: 'https://picsum.photos/id/1005/32', status: 'নতুন লিড' },
        { title: 'মোবাইল অ্যাপ ডেভেলপমেন্ট', company: 'এক্সওয়াইজেড লিমিটেড', value: 350000, ownerAvatar: 'https://picsum.photos/id/1011/32', status: 'প্রস্তাব পাঠানো হয়েছে' },
        { title: 'ডিজিটাল মার্কেটিং ক্যাম্পেইন', company: 'আলফা টেক', value: 80000, ownerAvatar: 'https://picsum.photos/id/1012/32', status: 'যোগাযোগ হয়েছে' },
        { title: 'ইআরপি সফটওয়্যার', company: 'বেটা সলিউশনস', value: 500000, ownerAvatar: 'https://picsum.photos/id/1027/32', status: 'জয়ী' },
        { title: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', company: 'গামা এন্টারপ্রাইজ', value: 50000, ownerAvatar: 'https://picsum.photos/id/1040/32', status: 'যোগাযোগ হয়েছে' },
        { title: 'লোগো ও ব্র্যান্ডিং', company: 'ডেল্টা গ্রুপ', value: 75000, ownerAvatar: 'https://picsum.photos/id/1005/32', status: 'নতুন লিড' },
    ],
    inventory: [
        { productName: 'ল্যাপটপ ব্যাগ', sku: 'LP-BG-001', category: 'এক্সেসরিজ', stock: 120, price: 1500 },
        { productName: 'ওয়্যারলেস মাউস', sku: 'MS-WL-005', category: 'কম্পিউটার পার্টস', stock: 85, price: 800 },
        { productName: 'এইচডি মনিটর', sku: 'MN-HD-021', category: 'ইলেকট্রনিক্স', stock: 45, price: 12500 },
        { productName: 'কফি মগ', sku: 'MG-CF-010', category: 'অফিস সাপ্লাই', stock: 250, price: 350 },
        { productName: 'টি-শার্ট', sku: 'TS-MD-032', category: 'পোশাক', stock: 8, price: 500 },
        { productName: 'নোটবুক', sku: 'NB-LG-002', category: 'স্টেশনারি', stock: 0, price: 120 },
    ]
};

const seedDatabase = async () => {
    try {
        const userCount = await User.count();
        if (userCount === 0) {
            console.log('Seeding users...');
            await User.bulkCreate(initialData.users);
        }

        const projectCount = await Project.count();
        if (projectCount === 0) {
            console.log('Seeding projects...');
            await Project.bulkCreate(initialData.projects);
        }

        const leadCount = await Lead.count();
        if (leadCount === 0) {
            console.log('Seeding leads...');
            await Lead.bulkCreate(initialData.leads);
        }

        const inventoryCount = await InventoryItem.count();
        if (inventoryCount === 0) {
            console.log('Seeding inventory...');
            await InventoryItem.bulkCreate(initialData.inventory);
        }

        if (userCount > 0 && projectCount > 0 && leadCount > 0 && inventoryCount > 0) {
            console.log('Database already appears to be seeded.');
        }

    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;
