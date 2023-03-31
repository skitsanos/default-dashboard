import {create} from 'zustand';

const APPLICATION_LAYOUT_KEY = 'layout';

const useLayoutSwitcher = create((set, get) => ({
    layout: localStorage.getItem(APPLICATION_LAYOUT_KEY) !== null
        ? localStorage.getItem(APPLICATION_LAYOUT_KEY)
        : 'top',

    toggle: () =>
    {
        const newLayout = get().layout === 'top' ? 'side' : 'top';
        set({layout: newLayout});

        localStorage.setItem(APPLICATION_LAYOUT_KEY, newLayout);
    }
}));

export default useLayoutSwitcher;