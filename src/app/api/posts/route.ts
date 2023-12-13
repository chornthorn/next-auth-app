export async function GET(req: Request, res: Response) {
  // mock data
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
    },
  ];

  return Response.json(posts);
}
