import ContentArea from '@/components/ContentArea';
import {useLocation, useParams} from 'umi';
import '@/pages/files/thumbnails.less';
import {Card} from 'antd';
import {useEffect, useState} from 'react';

const PAGE_PLACEHOLDERS = Array.from({length: 10}, (_el, index) => `page-${index + 1}`);

// The viewer fills the space between its own top edge and the bottom of the viewport.
const BOTTOM_MARGIN_VH = 4;

export default () =>
{
    const location = useLocation();
    const {fileId} = useParams();

    // The page is reachable by direct link, so route state may be missing entirely.
    const {name} = (location.state ?? {}) as {name?: string};

    const [height, setHeight] = useState('auto');

    useEffect(() =>
    {
        if (!fileId)
        {
            return;
        }

        const adjustHeight = () =>
        {
            const el = document.getElementById(fileId);
            if (!el)
            {
                return;
            }

            const topVh = el.getBoundingClientRect().top * (100 / window.innerHeight);

            setHeight(`${100 - BOTTOM_MARGIN_VH - topVh}vh`);
        };

        adjustHeight();
        window.addEventListener('resize', adjustHeight);

        return () => window.removeEventListener('resize', adjustHeight);
    }, [fileId]);

    return <ContentArea title={'File Preview'}
                        className={'v-box'}
                        subTitle={name ?? fileId}>

        <Card>
            some details
        </Card>

        <Card>
            <div id={fileId}
                 className={'file-viewer'}
                 style={{height}}>

                <div className={'file-thumbnails-list'}>
                    {PAGE_PLACEHOLDERS.map(page => <div key={page}
                                                        className={'file-thumbnails-item'}/>)}
                </div>

                <div className={'file-page-preview'}>preview</div>
            </div>
        </Card>
    </ContentArea>;
};
