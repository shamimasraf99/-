import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

interface Activity {
  icon: string;
  text: string;
  time: string;
}

interface Task {
    text: string;
    done: boolean;
}

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent {
  stats = signal<StatCard[]>([
    { title: 'মোট ক্লায়েন্ট', value: '১২৫', change: '+২.৫%', changeType: 'increase', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.002 3.002 0 01-3.71-3.71A3 3 0 017 10h4a3 3 0 013 3v1.143', color: 'text-blue-500' },
    { title: 'মোট কর্মী', value: '৪৫', change: '+১.২%', changeType: 'increase', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1-3.72a6.002 6.002 0 00-4 0c-.35.99-.5 2.06-.5 3.12V21h4z', color: 'text-green-500' },
    { title: 'মোট ইনভয়েস', value: '৩১৭', change: '-০.৫%', changeType: 'decrease', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-orange-500' },
    { title: 'চলমান প্রজেক্ট', value: '২১', change: '+৫%', changeType: 'increase', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z', color: 'text-purple-500' },
  ]);

  activities = signal<Activity[]>([
    { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', text: '<strong>মোঃ হাসান</strong> একজন নতুন কর্মী হিসেবে যোগ দিয়েছেন।', time: '৫ মিনিট আগে' },
    { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', text: 'ইনভয়েস <strong>#INV-0315</strong> পেমেন্ট করা হয়েছে।', time: '১ ঘণ্টা আগে' },
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', text: 'আগামীকালের জন্য একটি নতুন মিটিং তৈরি করা হয়েছে।', time: '৩ ঘণ্টা আগে' },
    { icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', text: 'প্রজেক্ট "ইআরপি সিস্টেম" এর স্ট্যাটাস আপডেট করা হয়েছে।', time: 'গতকাল' },
  ]);

  tasks = signal<Task[]>([
    { text: 'টিম মিটিংয়ের জন্য প্রস্তুতি নিন', done: false },
    { text: 'মার্কেটিং রিপোর্ট পর্যালোচনা করুন', done: true },
    { text: 'নতুন ক্লায়েন্টের সাথে যোগাযোগ করুন', done: false },
    { text: 'ইনভয়েস #INV-0318 পাঠান', done: false },
  ]);

  chartData = signal([
    { month: 'জানু', income: 65000 },
    { month: 'ফেব্রু', income: 72000 },
    { month: 'মার্চ', income: 85000 },
    { month: 'এপ্রিল', income: 81000 },
    { month: 'মে', income: 92000 },
    { month: 'জুন', income: 110000 },
  ]);
  
  maxIncome = computed(() => Math.max(...this.chartData().map(d => d.income)));

  getBarHeight(income: number): number {
    return (income / this.maxIncome()) * 100;
  }

  toggleTask(index: number): void {
    this.tasks.update(currentTasks => {
        const newTasks = [...currentTasks];
        newTasks[index] = { ...newTasks[index], done: !newTasks[index].done };
        return newTasks;
    });
  }
}
