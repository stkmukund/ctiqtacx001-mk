import { useRouter } from 'vue-router';
import { useCheckoutStore } from '~/stores';

export const checkSteps = async () => {
    const checkoutStore = useCheckoutStore(); // No need to await here if it's not async
    const router = useRouter();

    // Check if router is ready (if needed)
    if (!router) return;

    // Ensure that `stepCompleted` exists and is valid
    const step = +checkoutStore.stepCompleted;

    switch (step) {
        case 1:
            return router.push('/offer1');
        case 2:
            return router.push('/offer2');
        case 3:
            return router.push('/offer2_1');
        case 4:
            return router.push('/offer3');
        case 5:
            return router.push('/offer4');
        case 6:
            return router.push('/thankyou');
        default:
        // return router.push('/');
    }
};
