const API_URL = "https://leetcode-api-faisalshohag.vercel.app";

export async function fetchSubmissions(username) {
  try {
    const response = await fetch(`${API_URL}/${username}`);

    const data = response.json();
    if (response.ok && data) {
      const submissions = data.recentSubmissionList;
      if (!submissions) {
        throw new Error("Username does not exist");
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

    const data = response.json();
    if (response.ok && data) {
      if (!data) {
        throw new Error("Username does not exist");
      }
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
