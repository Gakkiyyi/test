'use client'

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';
import { Col, Empty, Input, message, Row } from "antd";
import debounce from 'lodash/debounce';

interface dataProps {
  id: string;
  cell_cover_image_url: string;
  title: string;
  brand_logo_image_url: string;
  subtitle: string;
  brand_name: string
}

export default function Home() {
  const [data, setData] = useState<dataProps[]>([]);
  const [allData, setAllData] = useState<dataProps[]>([]);
  const [keyWord, setKeyWord] = useState("");
  const [flag, setFlag] = useState(false);

  const Card: React.FC<dataProps> = (data: dataProps) => {
    return (
      <div className="h-[500px] flex justify-center relative bg-cover bg-no-repeat bg-position-[50%] rounded-[8px]"
        style={{ backgroundImage: `url(${data.cell_cover_image_url})` }}
      >
        <div className="h-[100px] w-[100px] absolute top-0 left-[0]">
          <Image src={data.brand_logo_image_url}
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="h-[100px] w-[100%] absolute bottom-[20px] left-0 flex flex-col text-[20px] text-white text-center font-bold">
          <span>{data.title}</span>
          <span>{data.subtitle}</span>
        </div>
      </div>
    )
  }

  useEffect(() => {
    axios.get('http://api.authclass.com/user/v1/course').then((res) => {
      if (res.status === 200) {
        if (res.data.data && Array.isArray(res.data.data)) {
          setData(res.data.data)
          setAllData(res.data.data)
          setFlag(true)
        }
      } else {
        message.error('请求失败！')
      }
    }).catch(() => {
      message.error('请求失败！')
    })
  }, [])
  const handleChange = useCallback(debounce((value: string | undefined) => {
    if (value) {
      setData(allData.filter(course =>
        course.brand_name?.toLowerCase().includes(value.toLowerCase())))
    } else {
      setData(allData);
    }
  }, 300), [allData])
  return (
    <div className="mx-[10%] my-[2%]">
      <div className="w-[300px] my-[20px] mx-[auto]">
        <Input.Search
          type="search"
          value={keyWord}
          onChange={(e) => {
            setKeyWord(e.target.value)
            handleChange(e.target.value)
          }}
          onSearch={() => { handleChange(keyWord) }}
        />
      </div>
      <div className="flex justify-center max-w-1280px">
        {
          (data.length && flag)
            ?
            <Row gutter={[50, 50]} className="w-[1280px]">
              {
                data.map((item) =>
                  <Col xs={{span: 24}} sm={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} key={item.id}>
                    <Card {...item} />
                  </Col>
                )
              }
            </Row>
            :
            <Empty />
        }
      </div>
    </div>
  );
}
