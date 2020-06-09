export const Service = {
    Gql: {

        Query(qry) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `query Query ${qry}`, variables: {} }),

            };
            return Service.Common.Fetch('https://graphql.anilist.co/', requestOptions);
        },
        Mutuation(qry) {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer {TOKEN}",
                },
                body: JSON.stringify({ query: `mutation Mutuation ${qry}`, variables: {} }),

            };
            return Service.Common.Fetch('https://graphql.anilist.co/', requestOptions);
        },
    },


    /**
     * [COMMON]
     * @function Fetch
     */
    Common: {
        Fetch(url, requestOptions) {
            return fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    if (response.status === 401) {
                        window.location.href = '/login';
                    } else {
                        throw new Error();
                    }
                })
                .then(json => json)
                .catch(() => false);
        },
    },
};
