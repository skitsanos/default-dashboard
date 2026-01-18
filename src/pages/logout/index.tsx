import ContentArea from '@/components/ContentArea';
import {Skeleton} from 'antd';
import {useEffect} from 'react';
import useSession from '@/hooks/useSession';

export default () =>
{
    const {logout} = useSession();

    useEffect(() =>
    {
        localStorage.clear();

        logout();
    }, []);

    return <ContentArea title={'Logout'}>
        <Skeleton active={true}/>
    </ContentArea>;
};