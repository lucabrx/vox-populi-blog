import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/Layout";
import LgSidebar from "~/components/LgSidebar";
import Loader from "~/components/Loader";
import MainCard from "~/components/ui/MainCard";
import NewsCard from "~/components/ui/NewsCard";
import StoryCard from "~/components/ui/StoryCard";
import { api } from "~/utils/api";




const Home: NextPage = () => {
  const latestBlogs = api.post.getNewest.useQuery()

  const latestNews = api.post.getLatestNews.useQuery()

  const latestStories = api.post.getStories.useQuery()
  return (
    <>
      <Head>
        <title>Vox Pupoli</title>
      </Head>
      <Layout>
      <div className="flex justify-center items-center w-full px-[24px] max-w-[1300px] mx-auto pt-2 flex-col">

  
  <div className="flex w-full  justify-between ">

    <div className="hidden lg:flex lg:w-[25%]">
      <LgSidebar />
    </div>

    <div className="lg:w-[75%] w-full flex justify-center items-center flex-col pt-2 gap-4">
    <h2 className="w-full text-center lgx:text-left  lgx:px-6 sxl:px-14 xl:px-20 text-lg lg:text-2xl">Latest Blogs</h2>
      <div className="flex gap-4 flex-wrap justify-center items-center">
        {latestBlogs.isLoading  && <Loader />}
      {latestBlogs.data?.map((item) => (
        <MainCard link={item.images } key={item.id} path={`/${item.category}/${item.slug}`} desc={item.description} title={item.title} category={item.category as 'Lifestyle' | 'Sport' | 'Tech' | 'Story'} />
      ))}
      </div>
      <h2 className="w-full text-center lgx:text-left  lgx:px-6 sxl:px-14 xl:px-20 text-lg lg:text-2xl">Latest News</h2>
      <div className="flex gap-4 flex-wrap justify-center items-center">
      {
        latestNews.data?.map((item) => (
          <NewsCard key={item.id} path={`/${item.category}/${item.slug}`} title={item.title}  />
        ))
      }
      </div>
      <h2 className="w-full text-center lgx:text-left  lgx:px-6 sxl:px-14 xl:px-20 text-lg lg:text-2xl">Month Stories</h2>
      <div className="flex gap-4 flex-wrap justify-center items-center">
      {latestStories.data?.map((item) => (
        <StoryCard storyType={item.story }  link={item.images} key={item.id} path={`/${item.category}/${item.slug}`} desc={item.description} title={item.title} category={item.category as 'Lifestyle' | 'Sport' | 'Tech' | 'Story'  }   />
        
      ))}
      </div>

      <div>

      </div>
    </div>
  </div>

      </div>
      </Layout>
    </>
  );
};

export default Home;


