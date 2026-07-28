import ContentArea from '@/components/ContentArea';
import {AlignLeftOutlined, InboxOutlined, TableOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Row, Space, Upload, UploadFile} from 'antd';
import {useState} from 'react';
import {useRequest} from 'ahooks';

const THUMBNAIL_COUNT = 5;

const PROCESSING_DELAY = 2000;

export default () =>
{
    const [contextFile, setContextFile] = useState<UploadFile | null>(null);

    const {
        loading: loadingProcessing,
        run: runProcessing
    } = useRequest(() => new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY)), {manual: true});

    // `beforeUpload` returning false keeps the file local; picking one is what moves us to the preview step.
    const beforeUpload = (file: UploadFile) =>
    {
        setContextFile(file);
        runProcessing();

        return false;
    };

    return <ContentArea title={'Upload'}
                        subTitle={'Upload files for processing and content extraction'}
                        avatar={{
                            icon: <UploadOutlined/>,
                            shape: 'square',
                            style: {
                                backgroundColor: '#af98d4'
                            }
                        }}>

        {!contextFile && <Card>
            <div className={'mb'}>
                Select the file you would like to process for text or table extraction.
            </div>

            <Upload.Dragger name={'file'}
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={beforeUpload}>
                <p className={'ant-upload-drag-icon'}>
                    <InboxOutlined/>
                </p>

                <p className={'ant-upload-text'}>Click or drag file to this area to upload</p>
            </Upload.Dragger>
        </Card>}

        {contextFile && <>
            <Card className={'mb'}>
                <Space>
                    <Button type={'link'}
                            icon={<AlignLeftOutlined/>}>Extract text</Button>

                    <Button type={'link'}
                            icon={<TableOutlined/>}
                            disabled={true}>Extract tables</Button>

                    <Button type={'link'}
                            onClick={() => setContextFile(null)}>Choose another file</Button>
                </Space>
            </Card>

            <Card loading={loadingProcessing}>
                <Row gutter={[8, 8]}>
                    <Col style={{width: '200px'}}>
                        <Space direction={'vertical'}>
                            {Array.from({length: THUMBNAIL_COUNT}, (_el, index) => <Card
                                key={`thumbnail-${index}`}
                                style={{
                                    width: '180px',
                                    aspectRatio: '3/4',
                                    backgroundColor: '#efefef'
                                }}/>)}
                        </Space>
                    </Col>

                    <Col>
                        <Card style={{
                            width: '500px',
                            aspectRatio: '3/4',
                            backgroundColor: '#efefef'
                        }}/>
                    </Col>

                    <Col><Divider type={'vertical'}
                                  style={{height: '100%'}}/></Col>

                    <Col>
                        <Space direction={'vertical'}>
                            <h3>File details</h3>
                            <div aria-label={'File name'}>{contextFile.name}</div>
                            <div aria-label={'Size'}>{contextFile.size ?? 0} bytes</div>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>}

    </ContentArea>;
};
