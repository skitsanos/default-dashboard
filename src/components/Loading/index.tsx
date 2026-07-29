import {Spin} from 'antd';
import type {FC} from 'react';

export interface LoadingProps
{
    loading?: boolean;
}

const Loading: FC<LoadingProps> = ({loading = false}) =>
{
    if (!loading)
    {
        return null;
    }

    return <div className={'flex-center p-8'}
                role={'status'}
                aria-live={'polite'}>
        <Spin size={'large'}/>
    </div>;
};

export default Loading;
