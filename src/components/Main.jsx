import React from "react";
import Hero from "./mainComponents/Hero";
import About from "./mainComponents/About";
import Example from "./mainComponents/Example";
import Sale from "./mainComponents/Sale";
import Top from "./mainComponents/Top";
import Video from "./mainComponents/Video";
import Form from "./mainComponents/Form";
import Contacts from "./mainComponents/Contacts";
import Comments from "./mainComponents/Comments";
import Catalog from "./mainComponents/Catalog";
import Up from "./mainComponents/up/Up";

const Main = () => {
  return (
    <main className="main">
      <Hero />
      <About />
      <Example />
      <Sale />
      <Top />
      <Catalog />
      <Comments />
      <Video />
      <Form />
      <Contacts />
      <Up/>
    </main>
  );
};

export default Main;
