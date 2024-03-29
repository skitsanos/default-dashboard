import ContentArea from '@/components/ContentArea';
import {useLocation, useParams} from 'umi';
import '@/pages/files/thumbnails.less';
import chance from 'chance';
import {Card} from 'antd';
import {useEffect, useState} from 'react';

const generatePage = function* ()
{
    yield {
        type: 'PDF',
        uuid: chance().guid()
    };
};

const loadedDocument = Array.from({length: 10}, () => generatePage().next().value);

export default () =>
{
    const location = useLocation();
    const {name} = location.state as Record<string, any>;
    const params = useParams();
    const {fileId} = params;

    const [height, setHeight] = useState('auto'); // Initialize height to 'auto'

    useEffect(() =>
    {
        const adjustHeight = () =>
        {
            const el = document.getElementById(fileId);
            if (!el)
            {
                return;
            }

            // Get the y position of the second element
            const yPos = el.getBoundingClientRect().top;

            // Convert y position from pixels to viewport units (vh)
            const yPosVh = yPos * (100 / window.innerHeight);

            // Calculate the height
            const newHeightVh = 96 - yPosVh;

            setHeight(`${newHeightVh}vh`);
        };

        adjustHeight(); // Initial adjustment
        window.addEventListener('resize', adjustHeight); // adjust on window resize

        return () =>
        {
            // Cleanup - remove event listener when component unmounts
            window.removeEventListener('resize', adjustHeight);
        };
    }, []);

    return <ContentArea title={'File Preview'}
                        className={'v-box'}
                        subTitle={name}>

        <Card>
            some details
        </Card>

        <Card>
            <div id={fileId}
                 className={'file-viewer'}
                 style={{height}}>

                <div className={'file-thumbnails-list'}>
                    {
                        loadedDocument.map((_el, index) => <div key={`page-${index}`}
                                                                className={'file-thumbnails-item'}></div>)
                    }
                </div>

                <div className={'file-page-preview'}>preview</div>
            </div>
        </Card>
    </ContentArea>;
}