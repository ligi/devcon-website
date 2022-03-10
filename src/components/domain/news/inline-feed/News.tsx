import React from 'react'
// import Slider from 'react-slick'
import { Card } from 'components/common/card'
import { Feed } from 'components/common/feed'
import css from './news.module.scss'
import { useTranslations } from 'next-intl'

import { NewsItem } from 'types/NewsItem'
import moment from 'moment'
import { Slider, useSlider } from 'components/common/slider'

type NewsProps = {
  data?: any
  className?: string
}

const settings = {
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 2.1,
  swipeToSlide: true,
  touchThreshold: 100,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.1,
      },
    },
  ],
}

const formatNewsForCard = (intl: any, item: NewsItem) => {
  let formattedItem = {
    ...item,
    date: new Date (item.date),
    linkUrl: item.url,
  }

  if (item.url?.includes('twitter')) {
    formattedItem = {
      ...formattedItem,
      title: intl.formatMessage({ id: 'news_tweet' }),
    }
  }

  return formattedItem
}

export const News = (props: NewsProps) => {
  const newsItems = props.data
  const intl = useTranslations()
  const sliderProps = useSlider(settings)

  return (
    <div className="section">
      <div className={css['news-container']}>
        <h2 className="title spaced">{intl('news')}</h2>

        {/* Only visible on mobile */}
        <div className={css['slider-container']}>
          <Slider className={css['slider']} sliderProps={sliderProps} title={intl('news')}>
            {newsItems.map((item: NewsItem, index: any) => {
              const formattedItem = formatNewsForCard(intl, item)

              return (
                <Card
                  expandLink
                  slide={sliderProps[1].canSlide}
                  className={`${css['card']} ${css['slider']}`}
                  key={index}
                  metadata={[moment.utc(formattedItem.date).format('MMM D, YYYY')]}
                  {...formattedItem}
                  allowDrag
                />
              )
            })}
          </Slider>
        </div>

        <div className={css['body']}>
          <div className={css['cards']}>
            {newsItems.slice(0, 2).map((item: NewsItem, index: any) => {
              const formattedItem = formatNewsForCard(intl, item)

              return (
                <Card
                  expandLink
                  className={css['card']}
                  metadata={[moment.utc(item.date).format('MMM D, YYYY')]}
                  key={index}
                  {...formattedItem}
                />
              )
            })}
          </div>
          <div className={css['feed']}>
            <Feed inline title={intl('news_feed')} items={newsItems.slice(2)} />
          </div>
        </div>
      </div>
    </div>
  )
}
