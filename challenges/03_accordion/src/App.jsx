import "./styles.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [isOpen, setIsOpen] = useState(null);

  function handleClick(id) {
    if (id === isOpen) setIsOpen(() => null);
    else setIsOpen(id);
  }

  return (
    <div className="accordion">
      {data.map((item, i) => (
        <AccordionItem
          number={i}
          key={i}
          title={item.title}
          handleClick={handleClick}
          isOpen={isOpen === i}
        >
          {isOpen === i && <div className="content-box">{item.text}</div>}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ number, title, handleClick, children, isOpen }) {
  return (
    <div
      className={isOpen ? "item open" : "item"}
      onClick={() => handleClick(number)}
    >
      <p className="number">{number < 9 ? `0${number + 1}` : number + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {children}
    </div>
  );
}
