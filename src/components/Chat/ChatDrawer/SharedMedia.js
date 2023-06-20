import { Col, Row, Typography, Image } from 'antd';
import { isArray, isEmpty, isObject, toNumber, cloneDeep, flattenDeep } from 'lodash';
import React, { useState, useEffect, useRef, useMemo } from 'react';
// import Search from 'antd/lib/input/Search';
import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'next-i18next';
// import { AiOutlineFilter } from 'react-icons/ai';
import getApiData from '@dinkum/helpers/apiHelper';
import { docTypes } from '@dinkum/helpers/utility';
// import { FileTextOutlined } from '@ant-design/icons';
// import { formatFileSize } from '@dinkum/helpers/commonFunc';
// import { images } from '@dinkum/config/images';
import useWindowSize from '@dinkum/helpers/hooks/useWindowSize';
import { images } from '@dinkum/config/images';
import moment from 'moment';
import award from '../../../../../public/assets/images/award.png';
import { SharedMediaWrapper } from '../Chat.Style';

function SharedMedia() {
  const { Text, Title } = Typography;
  const wrapperRef = useRef(null);
  const [paginationObj, setpaginationObj] = useState({});
  const [listData, setListData] = useState([]);
  console.log('🚀 ~ file: SharedMedia.js:23 ~ SharedMedia ~ listData:', listData);
  const [pageLoad, setPageLoad] = useState(false);
  const [page, setPage] = useState(1);
  const { selectedChat } = useSelector((state) => state.chat);
  console.log('🚀 ~ file: SharedMedia.js:26 ~ SharedMedia ~ selectedChat:', selectedChat);
  const wWidth = useWindowSize().height;

  // const { t } = useTranslation('chat');

  async function getMediaList(keyword = '', sortCreated = '') {
    const dd = {
      group_id: selectedChat?.group_id,
      page,
      keyword,
      sortCreated,
    };
    console.log('🚀 ~ file: SharedMedia.js:53 ~ getMediaList ~ dd:', dd);

    try {
      const res = await getApiData({
        url: `group/media-list`,
        data: dd,
      });
      console.log('🚀 ~ file: SharedMedia.js:58 ~ getMediaList ~ res:', res);
      if (res.success) {
        let newMList = [];
        if (keyword !== '' || sortCreated !== '' || keyword === '') {
          newMList = res?.result;
        } else {
          newMList = cloneDeep(listData);

          if (isArray(newMList) && newMList.length > 0) {
            newMList = flattenDeep([...newMList, res?.result]);
          } else {
            newMList = res?.result;
          }
        }
        setpaginationObj(res);
        setListData(newMList);
        setPageLoad(false);
      } else {
        setPageLoad(false);
      }
    } catch (err) {
      setPageLoad(false);
    }
  }

  useEffect(() => {
    if (isObject(selectedChat) && !isEmpty(selectedChat)) {
      setPageLoad(true);
      getMediaList();
    }
  }, [selectedChat, page]);

  const height1 = useMemo(() => {
    const he1 = wWidth || 700;
    return he1;
  }, [wWidth]);

  function renderImageItem(i, index) {
    console.log('🚀 ~ file: SharedMedia.js:100 ~ renderImageItem ~ i:', i);
    return (
      <Col key={index} span={8} className="image-col">
        <Image
          src={i.file_url}
          blurDataURL={i.file_url}
          placeholder="blur"
          alt={award}
          width={180}
          height={180}
        />
      </Col>
    );
  }

  function renderListItem(i, index) {
    const fData = i?.file_meta || {};
    // const fType = docTypes[fData.type] || '';
    return (
      <Col
        key={index}
        onClick={() => {
          window.open(i?.file_url);
        }}
        className="main-content-container"
      >
        <div className="shared-files">
          <div className="img-con-shared">
            <Image src={images.rxD} height={70} width={50} />
          </div>
          {/* <Avatar
            shape="square"
            size={62}
            icon={<FileTextOutlined />}
            className="shared-typed-image"
          /> */}
          <div className="shared-sender">
            <div className="shared-details">
              <div>
                <Text className="shared-sender-detail">{i?.sender_name}</Text>
              </div>
              <Text className="shared-sender-file-name">{fData?.filename}</Text>
              {/* <Divider type="verticle" /> */}
              {/* <Text style={{ textTransform: 'uppercase' }}>{fType}</Text>
              <Text style={{ marginLeft: '10px' }}>{formatFileSize(fData?.size)}</Text> */}
            </div>
          </div>
        </div>
      </Col>
    );
  }

  function renderFilterUI() {
    return (
      <div className="shared-media">
        {/* <div className="shared-search">
          <Search
            placeholder={t('searchByName', { ns: 'common' })}
            onSearch={(v) => {
              getMediaList(v);
            }}
          />
        </div>
        <div className="filter-search">
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu
                onClick={(v) => {
                  getMediaList('', v.key);
                }}
              >
                <Menu.Item key="asc">{t('filterOld')}</Menu.Item>
                <Menu.Item key="desc">{t('filterNew')}</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button className="filter-btn" type="primary" ghost>
              <AiOutlineFilter />
            </Button>
          </Dropdown> */}
        {/* </div> */}
        <div className="shared-title">
          <Title level={5}>Recent Media</Title>
        </div>
      </div>
    );
  }

  function fetchMoreData() {
    if (isObject(paginationObj) && !isEmpty(paginationObj) && paginationObj?.next_enable === true) {
      const lastPage = toNumber(paginationObj?.page);
      setPage(lastPage + 1);
    }
  }

  function listItems(index, user) {
    console.log('🚀 ~ file: SharedMedia.js:202 ~ listItems ~ user:', user);
    return (
      <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className="whole-shared">
          <Typography className="date-txt">
            {moment(user?.format_date).format('DD MMMM YYYY')}
          </Typography>
          <div className="shared-image">
            <Row className="row-grid-shared">
              {isArray(user?.file_list) && !isEmpty(user?.file_list)
                ? user?.file_list.map(
                    (item, ii) => {
                      console.log('🚀 ~ file: SharedMedia.js:212 ~ listItems ~ item:', item);
                      const isFileData = item?.type === 'file';
                      if (isFileData) {
                        const fData = item?.file_meta || {};
                        const fType = docTypes[fData.type] || '';
                        const isImage = ['png', 'jpg', 'jpeg'].indexOf(fType) > -1;

                        return isImage ? renderImageItem(item, ii) : renderListItem(item, ii);
                      }

                      return renderImageItem(item, ii);
                    }
                    // }
                    // return null;
                  )
                : null}
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderList() {
    if (isArray(listData) && !isEmpty(listData)) {
      return (
        <div className="shared-content">
          <Virtuoso
            style={{ height: height1 - 180 }}
            ref={wrapperRef}
            data={listData}
            endReached={() => {
              fetchMoreData();
            }}
            overscan={200}
            itemContent={(index, user) => listItems(index, user)}
          />
        </div>
      );
    }
    return null;
  }

  if (pageLoad) {
    return null;
  }

  return (
    <SharedMediaWrapper>
      {renderFilterUI()}
      {renderList()}
    </SharedMediaWrapper>
  );
}

export default SharedMedia;
