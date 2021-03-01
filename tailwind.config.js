module.exports = {
    purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                kaios: ['Open Sans'],
            },
            fontSize: {
                // 17px
                base: '1.0625rem',
                primary: '1.0625rem',
                secondary: '.875rem',
                tertiary: '.75rem',
            },
            colors: {
                // Base color: #23b5e1
                shakespeare: {
                    50: '#f4fbfe',
                    100: '#e9f8fc',
                    200: '#c8edf8',
                    300: '#a7e1f3',
                    400: '#65cbea',
                    500: '#23b5e1',
                    600: '#20a3cb',
                    700: '#1a88a9',
                    800: '#156d87',
                    900: '#11596e',
                },
            },
            width: {
                16: '16px',
                20: '20px',
                24: '24px',
                30: '30px',
                32: '32px',
                48: '48px',
            },
            minWidth: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                full: '100%',
            },
            height: {
                16: '16px',
                20: '20px',
                24: '24px',
                30: '30px',
                32: '32px',
                48: '48px',
            },
            maxHeight: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                full: '100%',
            },
            inset: {
                30: '30px',
            },
            boxShadow: {
                DEFAULT:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.32), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
            },
            zIndex: {
                '-1': '-1',
                100: 100,
                200: 200,
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [],
}
