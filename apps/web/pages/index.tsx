import { NextPage } from 'next';
import { ReactElement } from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { BaseLayout } from '../layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
    return (
        <SessionAuth>
            <div>
                <h1>Home</h1>
                <a>About</a>
            </div>
        </SessionAuth>
    );
};

Home.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Home;
