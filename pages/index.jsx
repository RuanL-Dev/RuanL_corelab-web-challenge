import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import styled from 'styled-components'

import ContainerPage from '../src/components/layout/ContainerPage'
import ButtonAdd from '../src/components/button/ButtonAdd'
import SearchInput from '../src/components/search/SearchInput'
import Body from '../src/components/layout/Body'
import Cards from '../src/components/cards/Cards'

const SecondaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const MyFavorites = styled.div`
  margin-top: 30px;

  @media (max-width: 500px) {
    text-align: center;
  }
`

const StyledTitleFavorites = styled.div`
  font-size: 18px;
  @media (max-width: 500px) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`

const MyAnnounces = styled.div`
  margin-top: 30px;

  @media (max-width: 500px) {
    text-align: center;
  }
`

const StyledTitleAnnounces = styled.div`
  font-size: 18px;
`

const AnnouncesPostContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 0.5fr);
    grid-row-gap: 20px;
    grid-column-gap: 0px;
    margin-left: 100px;
  }
  @media (max-width: 750px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left: 0px;
  }
`

const fetcher = (url) => axios.get(url).then((res) => res.data)

function HomePage() {
  const [car, setCar] = useState('')
  const [loading, setLoading] = useState(false)
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`, fetcher)

  const router = useRouter()
  const handleClick = () => {
    setLoading(true)
    router.push('/newcar')
  }

  const search = (data) => {
    return data?.filter(
      (post) =>
        post.carModel?.toUpperCase().includes(car) ||
        post.carBrand?.toLowerCase().includes(car) ||
        post.carBrand?.toUpperCase().includes(car) ||
        post.carColor?.toLowerCase().includes(car) ||
        post.carColor?.toUpperCase().includes(car) ||
        post.carYear?.toLowerCase().includes(car) ||
        post.carYear?.toUpperCase().includes(car) ||
        post.carPlate?.toLowerCase().includes(car) ||
        post.carPlate?.toUpperCase().includes(car) ||
        post.carPrice?.toLowerCase().includes(car) ||
        post.carPrice?.toUpperCase().includes(car) ||
        post.carDescription?.toLowerCase().includes(car) ||
        post.carDescription?.toUpperCase().includes(car)
    )
  }
  return (
    <>
      <Body>
        <ContainerPage>
          <SearchInput
            type="text"
            name="search"
            placeholder="buscar"
            onChange={(event) => setCar(event.target.value.toUpperCase())}
          />
          <ButtonAdd loading={loading} type="submit" onClick={handleClick}>
            ADICIONAR
          </ButtonAdd>
          <SecondaryContainer>
            <MyFavorites>
              <StyledTitleFavorites>Favoritos</StyledTitleFavorites>
            </MyFavorites>
            <AnnouncesPostContainer>
              {search(data)
                ?.filter((p) => p.isLiked)
                .map((post) => (
                  <Cards
                    key={post._id}
                    name={post.carModel}
                    price={post.carPrice}
                    description={post.carDescription}
                    year={post.carYear}
                    brand={post.carBrand}
                    plate={post.carPlate}
                    id={post._id}
                    carColor={post.carColor.toLowerCase()}
                    isLiked={post.isLiked}
                  />
                ))}
            </AnnouncesPostContainer>
            <MyAnnounces>
              <StyledTitleAnnounces>Meus anúncios</StyledTitleAnnounces>
            </MyAnnounces>
            <AnnouncesPostContainer>
              {search(data)
                ?.filter((p) => !p.isLiked)
                .map((post) => (
                  <Cards
                    key={post._id}
                    name={post.carModel}
                    price={post.carPrice}
                    description={post.carDescription}
                    year={post.carYear}
                    brand={post.carBrand}
                    plate={post.carPlate}
                    id={post._id}
                    carColor={post.carColor.toLowerCase()}
                    isLiked={post.isLiked}
                  />
                ))}
            </AnnouncesPostContainer>
          </SecondaryContainer>
        </ContainerPage>
      </Body>
    </>
  )
}

export default HomePage
