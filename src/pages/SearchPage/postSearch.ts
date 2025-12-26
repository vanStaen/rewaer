interface SearchResults {
  count: number;
  users: Array<{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  items: Array<{
    id: string;
    title: string;
    brand?: string;
    mediaId: string;
    colors: string[];
    pattern?: string;
  }>;
  looks: Array<{
    id: string;
    title: string;
    mediaId: string;
    category?: string;
    season?: string;
    items: any[];
  }>;
}

export const postSearch = async (
  searchText: string,
): Promise<SearchResults | null> => {
  const requestBody = {
    searchText,
  };

  const response = await fetch(process.env.API_URL + `/search/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== 200 && response.status !== 201) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  const data: SearchResults = await response.json();
  return data;
};
