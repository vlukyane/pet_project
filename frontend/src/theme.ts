import {createMuiTheme} from '@material-ui/core';

export const theme = createMuiTheme({
    overrides: {
        MuiList: {
            root: {
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }
        },
        MuiPaper: {
            elevation1: {
                boxShadow: '17px 14px 13px 5px rgba(0, 0, 0, 0.52)'
            }
        },
        MuiListItem: {
            root: {
                paddingBottom: 0
            }
        },
        MuiListItemText: {
            primary: {
                cursor: 'pointer',
            }
        },
        MuiFab: {
            root: {
                width: 36,
                height: 30,
                marginLeft: 15
            }
        }
    }
});
