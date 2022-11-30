import { useEffect, useState } from "react";

import BlogEntry from "./components/BlogEntry";
import AddEntry from "./components/AddEntry";
import blogEntryService from "./services/blogEntryService";

const App = () => {
  const [blogEntries, setBlogEntries] = useState([]);

  useEffect(() => {
    blogEntryService.getAll().then((entries) => {
      setBlogEntries(entries);
    });
  }, []);

  const addInfo = (event) => {
    event.preventDefault();

    const newFormEntry = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
      likes: event.target[3].value,
    };

    blogEntryService.create(newFormEntry).then((returnedEntry) => {
      setBlogEntries(blogEntries.concat(returnedEntry));
    });
  };

  return (
    <div>
      <h1>Blog Entries</h1>
      <ol>
        {blogEntries.map((entry, i) => (
          <BlogEntry
            key={i}
            title={entry.title}
            author={entry.author}
            url={entry.url}
            likes={entry.likes}
          />
        ))}
      </ol>
      <br />
      <AddEntry addInfo={addInfo} />
    </div>
  );
};

export default App;
