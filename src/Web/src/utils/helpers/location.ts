import { createLocation, Location } from 'history';

type locationFunc = (current: Location<any>) => string;

export const resolveToLocation = (
    to: string | locationFunc | Location<any>,
    currentLocation: Location<any>
) => {
    return typeof to === 'function' ? to(currentLocation) : to;
};
export const normalizeToLocation = (
    to: string | Location<any>,
    currentLocation: Location<any>
) => {
    return typeof to === 'string'
        ? createLocation(to, null, null, currentLocation)
        : to;
};
