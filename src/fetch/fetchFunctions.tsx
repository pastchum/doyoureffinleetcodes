const API_URL = "https://leetcode-api-faisalshohag.vercel.app";

export async function fetchSubmissions(username) {
  try {
    const response = await fetch(`${API_URL}/${username}`);

    const data = await response.json();
    if (response.ok && data) {
      const submissions = data.recentSubmissions;
      if (!submissions) {
        throw new Error(
          "Username does not exist. Unable to fetch most recent submission"
        );
      }
      return submissions;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserData(username) {
  try {
    const response = await fetch(`${API_URL}/${username}`);

    const data = await response.json();
    if (response.ok && data) {
      if (!data) {
        throw new Error("Username does not exist. Unable to fetch data");
      }
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
