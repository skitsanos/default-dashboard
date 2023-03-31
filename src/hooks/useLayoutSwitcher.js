import {create} from 'zustand';

const APPLICATION_LAYOUT_KEY = 'layout';

const useLayoutSwitcher = create((set) => ({
    layout: localStorage.getItem(APPLICATION_LAYOUT_KEY) !== null
        ? JSON.parse(localStorage.getItem(APPLICATION_LAYOUT_KEY))
        : 'top',

    toggle: () =>
    {
        set({
            layout: layout === 'top' ? 'left' : 'top'
        });
        localStorage.setItem(APPLICATION_LAYOUT_KEY, JSON.stringify(layout));
    }
}));

export default useLayoutSwitcher;