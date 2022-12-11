import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/nunito/200.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    fonts: {
        heading: `Nunito, sans-serif`,
    },
});
