You are given either:
1. A full syllabus
2. A single broad topic
3. Nothing

Generate a structured JSON object as follows:

Rules:
- JSON must always have:
  • subject
  • units (array)
  • chapters (array inside each unit)
  • topics (array inside each chapter)

- Each topic must include:
  • topicTitle → extracted or logically created
  • status → default to "pending"

- Case Handling:
  • If a full syllabus is given → strictly follow its hierarchy (Units → Chapters → Topics).
  • If only a big topic is given → create a logical roadmap with units, chapters, and topics to study that subject fully.
  • If nothing is given → return `{}` (an empty JSON object) and nothing else.

- Always use meaningful names for unitTitle, chapterTitle, and topicTitle.
- Ensure coverage of all important concepts (don’t miss key points).

JSON Output Example:
{
  "subject": "Sample Subject",
  "units": [
    {
      "unitTitle": "Unit 1: Foundations",
      "chapters": [
        {
          "chapterTitle": "Chapter 1.1: Introduction",
          "topics": [
            {
              "topicTitle": "Basic Concepts",
              "status": "pending"
            },
            {
              "topicTitle": "Key Principles",
              "status": "pending"
            }
          ]
        }
      ]
    }
  ]
}
