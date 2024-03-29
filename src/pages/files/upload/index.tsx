import ContentArea from '@/components/ContentArea';
import {AlignLeftOutlined, InboxOutlined, TableOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Row, Space, Upload, UploadFile} from 'antd';
import {useState} from 'react';
import {UploadChangeParam} from 'antd/es/upload';
import {useRequest} from 'ahooks';

export default () =>
{
    const [showUpload, setShowUpload] = useState<boolean>(true);

    const {
        loading: loadingProcessing,
        run: runProcessing
    } = useRequest(() => new Promise(resolve =>
    {
        setTimeout(() =>
        {
            resolve({});
        }, 2000);
    }), {manual: true});

    const [contextFile, setContextFile] = useState<UploadFile>(null);

    const onChange = (info: UploadChangeParam) =>
    {
        console.log(info);

        setShowUpload(false);
        runProcessing();
    };

    const beforeUpload = (file: UploadFile) =>
    {
        setContextFile(file);
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

        {showUpload && <>
            <Card>
                <div className={'mb'}>
                    Select the file you would like to process for text or table extraction.
                </div>

                <Upload.Dragger name={'file'}
                                multiple={false}
                                showUploadList={false}
                                onChange={onChange}
                                beforeUpload={beforeUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>

                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Card>
        </>}

        {!showUpload && <>
            <Card className={'mb'}>
                <Space>
                    <Button type={'link'}
                            icon={<AlignLeftOutlined/>}>Extract text</Button>
                    <Button type={'link'}
                            icon={<TableOutlined/>}
                            disabled={true}>Extract tables</Button>
                </Space>
            </Card>

            <Card loading={loadingProcessing}>
                <Row gutter={[8, 8]}>
                    <Col style={{width: '200px'}}>
                        <Space direction={'vertical'}>
                            {Array.from({length: 5}, () => ({})).map((_el, index) => <Card
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
                        }}></Card>
                    </Col>

                    <Col><Divider type={'vertical'}
                                  style={{height: '100%'}}/></Col>

                    <Col>
                        <Space direction={'vertical'}>
                            <h3>File details</h3>
                            <div aria-label={'File name'}>{contextFile.name}</div>
                            <div aria-label={'Size'}>{contextFile.size} bytes</div>
                            <div aria-label={'Pages'}>16 pages</div>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>}

    </ContentArea>;
}