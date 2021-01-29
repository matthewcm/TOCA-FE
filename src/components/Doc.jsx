import React from 'react'

const Doc = () => (
    <div className="w-full m-auto" >

        <div className="container mx-auto px-6 p-6 bg-white dark:bg-gray-800">
            <div className="mb-16 text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                    Documentation
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Toolkit for Online Community Analytics
                </p>
                This is a uni project
            </div>
            <div className="flex flex-wrap my-12 dark:text-white">
                <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Increase Visualisations
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                        Understand your dataset further through available data visualisations
                    </p>
                </div>
                <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Number of topics
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">

                        Set the number of topics accordingly to the dataset, use the provided perplexity and coherency to drive a suitable number of topics
                    </p>
                </div>
                <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Stopwords
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">

                        Add additional stopwords than the program's default.
                        Currently uses stopwords from <a className="text-blue-500" target="_blank" href="https://spacy.io/models/en">spacy en stopwords list.</a>

                        As well as some generic Reddit stopwords
                    </p>
                </div>
                <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Reddit
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                        Create datasets from Reddit through this application if you don't already have one available
                    </p>
                </div>
                <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Make predictions
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                        Make predictions of future topics, benefitial for marketting or understanding general themes and social behaviours within communities.
                    </p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                    <div className="flex items-center mb-6">
                        <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500"
                             viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                            </path>
                        </svg>
                        <div className="ml-4 text-xl">
                            Understand how topics are connected
                        </div>
                    </div>
                    <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                        Draw connections between separate topics, and how conversations within different communities begin to converge to other topics

                    </p>
                </div>
            </div>
        </div>

    </div>
)

export default Doc