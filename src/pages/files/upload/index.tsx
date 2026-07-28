import ContentArea from '@/components/ContentArea';
import {AlignLeftOutlined, InboxOutlined, TableOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Row, Space, Upload, type UploadFile} from 'antd';
import {useState} from 'react';
import {useRequest} from 'ahooks';
import '@/pages/files/upload/upload.less';

const THUMBNAIL_PLACEHOLDERS = Array.from({length: 5}, (_el, index) => `thumbnail-${index + 1}`);

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
                            {THUMBNAIL_PLACEHOLDERS.map(thumbnail => <Card
                                key={thumbnail}
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
                        <h3>File details</h3>

                        {/* A <dl> pairs each label with its value for assistive tech - an aria-label on a
                            plain <div> has no supported role to attach to and is simply ignored. */}
                        <dl className={'file-details'}>
                            <dt>File name</dt>
                            <dd>{contextFile.name}</dd>

                            <dt>Size</dt>
                            <dd>{contextFile.size ?? 0} bytes</dd>
                        </dl>
                    </Col>
                </Row>
            </Card>
        </>}

    </ContentArea>;
};
