import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: colors.indigo[500],
        light: colors.indigo[100],
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue['A400'],
        light: colors.blue['A400'],
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        link: colors.blue[600],
    },
    link: colors.blue[800],
    icon: colors.blueGrey[600],
    background: {
        default: '#F4F6F8',
        paper: white,
    },
    divider: colors.grey[200],
};
