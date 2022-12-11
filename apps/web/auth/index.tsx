import PasswordlessReact from 'supertokens-auth-react/recipe/passwordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Router from 'next/router';
import { ENV } from '../config';

export const authConfig = () => {
    return {
        appInfo: {
            appName: ENV.appName || 'dating-app',
            apiDomain: ENV.apiDomain || 'http://localhost:8000',
            websiteDomain: ENV.domain || 'http://localhost:3000',
        },
        recipeList: [
            PasswordlessReact.init({
                contactMethod: 'EMAIL',
                onHandleEvent: async (context) => {
                    if (context.action === 'SUCCESS') {
                        if (context.isNewUser) {
                            Router.push('/wizard');
                        } else {
                            localStorage.getItem('isWizardCompleted') === 'true'
                                ? Router.push('/home')
                                : Router.push('/wizard');
                        }
                    }
                },
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href);
                    },
                },
            };
        },
    };
};
