import {
  matchedUserSchema,
  lastAcceptedSubmissionSchema,
} from '@/schemas/leetcode.js';

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string; [key: string]: any }>;
}

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

async function leetCodeGraphQLRequest<T = any>(
  request: GraphQLRequest
): Promise<GraphQLResponse<T>> {
  const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData;
}

export const LeetCodeGraphQLClient = {
  getUserProfile: async (username: string) => {
    const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    githubUrl
                    profile {
                        realName
                        aboutMe
                        solutionCount
                    }
                }
            }
        `;

    const variables = { username };
    return leetCodeGraphQLRequest<{ matchedUser: typeof matchedUserSchema }>({
      query,
      variables,
    });
  },

  getUserLastAcceptedSubmissions: async (
    username: string,
    limit: number = 10
  ) => {
    const query = `
        query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                id
                title
                titleSlug
                timestamp
            }
        }`;
    const variables = { username, limit };
    return leetCodeGraphQLRequest<{
      recentAcSubmissionList: Array<typeof lastAcceptedSubmissionSchema>;
    }>({ query, variables });
  },
};
