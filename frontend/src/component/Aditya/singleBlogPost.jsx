import { useParams } from "react-router-dom";
// import logo from '../adiAssets/logo.png';

const SinglePost = () => {
  const { id } = useParams();
  const initialPosts = [
    {
      id: 1,
      title: 'First Post',
      date: '2024-06-06',
      time: '10:00 AM',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ratione necessitatibus doloribus, voluptatum ipsa nam cum fuga error deleniti odit blanditiis, perferendis nemo quo alias eum, minima sint optio culpa?',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1718275623/Temporary/blogimage_pfdtcu.jpg',
      liked: false,
    },
    {
      id: 2,
      title: 'Second Post',
      date: '2024-06-07',
      time: '11:00 AM',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ratione necessitatibus doloribus, voluptatum ipsa nam cum fuga error deleniti odit blanditiis, perferendis nemo quo alias eum, minima sint optio culpa?',
      image: 'https://www.c-sharpcorner.com/article/create-image-gallery-using-angular-7/Images/Create%20Image%20Gallery%20Using%20Angular.png',
      liked: false,
    },
    {
      id: 3,
      title: 'Third Post',
      date: '2024-06-08',
      time: '12:00 PM',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ratione necessitatibus doloribus, voluptatum ipsa nam cum fuga error deleniti odit blanditiis, perferendis nemo quo alias eum, minima sint optio culpa?',
      image: 'https://www.c-sharpcorner.com/article/create-image-gallery-using-angular-7/Images/Create%20Image%20Gallery%20Using%20Angular.png',
      liked: false,
    },
    {
      id: 4,
      title: 'Fourth Post',
      date: '2024-06-09',
      time: '01:00 PM',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ratione necessitatibus doloribus, voluptatum ipsa nam cum fuga error deleniti odit blanditiis, perferendis nemo quo alias eum, minima sint optio culpa?',
      image: 'https://www.c-sharpcorner.com/article/create-image-gallery-using-angular-7/Images/Create%20Image%20Gallery%20Using%20Angular.png',
      liked: false,
    },
    {
      id: 5,
      title: 'Fifth Post',
      date: '2024-06-10',
      time: '02:00 PM',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ratione necessitatibus doloribus, voluptatum ipsa nam cum fuga error deleniti odit blanditiis, perferendis nemo quo alias eum, minima sint optio culpa?',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1718275623/Temporary/blogimage_pfdtcu.jpg',
      liked: false,
    },
  ];
  const post = initialPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Logo and Name */}
      <div className="flex flex-col items-center mb-8">
        {/* <img src={logo} alt="logo" className="w-24 h-24 md:w-32 md:h-32 mb-4"/> */}
        <p style={{fontFamily: "Futura-bold"}} className="font-bold text-2xl md:text-4xl">BUll'S Blog</p>
      </div>
      {/* Content Section */}
      <div className="flex justify-center mb-8">
        <img src={post.image} alt="post image" className="w-full md:w-4/5 h-auto object-cover transition-shadow duration-300 hover:shadow-2xl rounded-lg"/>
      </div>
      {/* Post Subheading and Content */}
      <section className="mx-auto md:w-4/5 p-4 bg-white shadow rounded-lg hover:bg-slate-200 transition-colors duration-300">
        <h1 className="text-xl md:text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">Last Updated on {post.date} at {post.time}</p>
        <p className="text-lg">{post.content}</p>
      </section>
    </div>
  );
};

export default SinglePost;