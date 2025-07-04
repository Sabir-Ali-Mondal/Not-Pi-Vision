    let prompt = "";
    if (mode === "splitter") {
        prompt = `Convert the following syllabus into small, well-defined conceptual parts.\nEach part should:\n\nRepresent a single, independent core concept or topic.\nBe self-explanatory and descriptive enough to guide a 100-word summary.\nBe clear and specific so it can be independently visualized as a concept in an HTML-based interface.\nBe named in a way that reflects its visual or conceptual focus, not just syllabus jargon.\n\nUse the following format for the output using ~ and ~~ to denote headings:\n~ Unit Name\n~~ Topic Title 1\n~~ Topic Title 2\n\nSubject: ${sub}\nSyllabus: ${syllabus}`;
    } else {
        prompt = `Think and make this topic into more small part so that each part can\nRepresent a single, independent core concept or topic.\nBe self-explanatory and descriptive enough to guide a 100-word summary.\nBe clear and specific so it can be independently visualized as a concept in an HTML-based interface.\nBe named in a way that reflects its visual or conceptual focus, not just syllabus jargon.\n\nUse the following format for the output using ~ and ~~ to denote headings:\n~ Topic Name\n~~ Topic part Title 1\n~~ Topic part Title 2\n\nTopic: ${sub}\nDescription: ${syllabus}`;
    }




new
let prompt = mode === "splitter" ?
    `Convert the following syllabus into small, well-defined conceptual parts. Each part should: Represent a single, independent and important core concept or topic. Be self-explanatory and descriptive enough to guide a ~100-word summary, as if a page can be generated from the topic name alone. Be clear and specific so it can be independently visualized as a concept in an HTML-based interface. Be named in a way that reflects its visual or conceptual focus, not just syllabus jargon. Use the following format for the output, using ~ and ~~ to denote headings: ~ Chapter X: Chapter Name\n~~ Subtopic Title (a topic of Chapter Name)\n~~ Subtopic Title (a topic of Chapter Name)\n\nNo other formatting and text allowed.\n\nSubject: ${sub}\nSyllabus: ${syllabus}` :
    `Think and make this topic into smaller parts so that each part can represent a single, independent core concept or topic. Be self-explanatory and descriptive enough to guide a 100-word summary. Be clear and specific so it can be independently visualized as a concept in an HTML-based interface. Be named in a way that reflects its visual or conceptual focus, not just syllabus jargon. Use the following format for the output using ~ and ~~ to denote headings: ~ Chapter Name\n~~ Subtopic Title (a topic of Chapter Name)\n~~ Subtopic Title (a topic of Chapter Name)\n\nNo other formatting and text allowed.\n\nTopic: ${sub}\nDescription: ${syllabus}`;
