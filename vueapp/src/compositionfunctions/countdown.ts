import {ref} from "vue";

const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
const oneMinute = 1000 * 60;
/*const oneSecond = 1000;*/

const useCountdown = () => {
    let interval: any = null;

    const endOfDiscount = ref(false);
    const nbDays = ref();
    const nbHours = ref();
    const nbMinutes = ref();

    const startCountdown = (toDate: Date) => {
        if (!toDate) {
            endOfDiscount.value = true;
            return;
        }
        interval = setInterval(() => {
            intervalFunction(toDate);
        }, 1000 * 60);
        intervalFunction(toDate);
    };

    const intervalFunction = (toDate: Date) => {
        const dateNow = new Date();
        const diff = toDate.getTime() - dateNow.getTime();

        if (diff < 0) {
            endOfDiscount.value = true;
            endCountdown();
        }

        const nbDaysCalc = Math.floor(diff / oneDay);
        nbDays.value = nbDaysCalc.toString();
        const remainderHours = diff - (nbDaysCalc * oneDay);
        const nbHoursCalc = Math.floor(remainderHours / oneHour);
        nbHours.value = nbHoursCalc.toString().padStart(2, '0');
        const remainderMinutes = remainderHours - (nbHoursCalc * oneHour);
        const nbMinutesCalc = Math.floor(remainderMinutes / oneMinute);
        nbMinutes.value = nbMinutesCalc.toString().padStart(2, '0');
        /*const remainderSeconds = remainderMinutes - (nbMinutesCalc * oneMinute);
        nbSeconds.value = Math.floor(remainderSeconds / oneSecond).toString().padStart(2, '0');*/
    };

    const endCountdown = () => {
        clearInterval(interval);
    };

    return {
        startCountdown,
        endCountdown,
        endOfDiscount,
        nbDays,
        nbHours,
        nbMinutes
    }
};

export default useCountdown;