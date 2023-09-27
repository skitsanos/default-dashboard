import ContentArea from '@/components/ContentArea';
import {useLocation, useParams} from 'umi';
import '@/pages/files/thumbnails.less';
import chance from 'chance';
import VirtualList from 'rc-virtual-list';

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
                    loadedDocument.map((el, index) => <div key={`page-${index}`}
                                                           className={'file-thumbnails-item'}></div>)
                }
            </div>

            {/*<VirtualList data={loadedDocument} height={800}*/}
            {/*             itemKey={'uuid'}*/}
            {/*             className={'file-thumbnails-list'}>*/}
            {/*    {(item) => <div className={'file-thumbnails-item'}>x</div>}*/}
            {/*</VirtualList>*/}

            <div className={'file-page-preview'}>preview</div>
        </div>
    </ContentArea>;
}