<script setup>

    let date = new Date()
    let todayDay = date.getDay()

    const list = [
        {
            day: 'Monday',
            dayIndex: 1,
            from: null,
            to: null,
            isWorking: false,
        },
        {
            day: 'Tuesday',
            dayIndex: 2,
            from: '10:00',
            to: '20:00',
            isWorking: false,
        },
        {
            day: 'Wednesday',
            dayIndex: 3,
            from: '10:00',
            to: '20:00',
            isWorking: false,
        },
        {
            day: 'Thursday',
            dayIndex: 4,
            from: '10:00',
            to: '20:00',
            isWorking: false,
        },
        {
            day: 'Friday',
            dayIndex: 5,
            from: '10:00',
            to: '22:00',
            isWorking: false,
        },
        {
            day: 'Saturday',
            dayIndex: 6,
            from: '11:00',
            to: '22:00',
            isWorking: false,
        },
        {
            day: 'Sunday',
            dayIndex: 7,
            from: '11:00',
            to: '18:00',
            isWorking: false,
        },
    ]

    // check if the restaurant is open
    function updateWorkingStatus() {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();

        list.forEach((item) => {
            if (item.dayIndex === currentDayIndex) {
                const currentTime = currentDate.getHours() * 100 + currentDate.getMinutes();
                const fromTime = item.from ? parseInt(item.from.replace(':', '')) : null;
                const toTime = item.to ? parseInt(item.to.replace(':', '')) : null;

                if (fromTime && toTime && currentTime >= fromTime && currentTime <= toTime) {
                    item.isWorking = true;
                } else {
                    item.isWorking = false;
                }
            } else {
                item.isWorking = false;
            }
        });
}

// Example usage
updateWorkingStatus();




</script>
<template>
    <div class="p-4">
        <div v-for="item in list" :key="item.day" class="grid grid-cols-2 py-4 px-2 border-b last:border-b-0 bg-opacity-10">
            <div>{{ item.day }}</div>
            <div class="text-right font-medium text-gray-700" :class="{ 'text-green-600': todayDay === item.dayIndex, 'text-red-600': todayDay === item.dayIndex && !item.isWorking }">
                <div v-if="item.from !== null ">{{  item.from }} - {{ item.to }}</div>
                <div v-else>Closed</div>
            </div>
        </div>
    </div>
</template>