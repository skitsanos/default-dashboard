import ContentArea from '@/components/ContentArea';
import {gridGutter} from '@/defaults';
import useLayoutSwitcher from '@/hooks/useLayoutSwitcher';
import ProCard from '@ant-design/pro-card';
import {Divider, Statistic} from 'antd';

const Page = () =>
{
    const {
        layout,
        toggle
    } = useLayoutSwitcher();

    return <ContentArea title={'Welcome'}
                        subTitle={'You are logged as Demo user'}
                        extra={[
                            <a key={'toggle-layout'}
                               onClick={toggle}>Toggle layout ({layout})</a>
                        ]}>
        <ProCard direction={'row'}
                 ghost={true}
                 gutter={gridGutter}
                 title={'Stats'}
                 subTitle={'Your current situation'}>

            <ProCard>
                <Statistic title={'Users'}
                           value={256}/>
            </ProCard>
            <ProCard>
                <Statistic title={'Page Views'}
                           value={77}
                           suffix={'K'}/>
            </ProCard>
            <ProCard>
                <Statistic title={'Served data'}
                           value={16}
                           suffix={'Gb'}/>
            </ProCard>
        </ProCard>

        <Divider/>

        <ProCard bordered={true}
                 direction={'column'}
                 gutter={gridGutter}>
            Some long content...

            {Array.from({length: 20}, (_el, key) => <ProCard key={key}>Card #{key}</ProCard>)}
        </ProCard>
    </ContentArea>;
};

export default Page;