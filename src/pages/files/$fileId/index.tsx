import ContentArea from '@/components/ContentArea';
import {useLocation, useParams} from 'umi';
import '@/pages/files/thumbnails.less';
import chance from 'chance';

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

    return <ContentArea title={'File Preview'} className={'v-box'}
                        subTitle={name}
                        breadcrumbs={[]}>

        <div className={'file-viewer'}>

            <div className={'file-thumbnails-list'}>
                {
                    loadedDocument.map((_el, index) => <div key={`page-${index}`}
                                                           className={'file-thumbnails-item'}></div>)
                }
            </div>

            <div className={'file-page-preview'}>preview</div>
        </div>
    </ContentArea>;
}