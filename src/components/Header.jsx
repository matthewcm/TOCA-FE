import React, { useState } from "react";
import {Link} from "react-router-dom";


const Header = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <nav
                className={`bg-white dark:bg-gray-800 mb-8 ${
                    props.withShadow ? " shadow" : ""
                }${props.isFat ? " py-4" : ""} `}
            >
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center justify-between h-16">
                        <div
                            className={`${
                                props.alignRight ? "w-full justify-between" : ""
                            } flex items-center`}
                        >
                            <a className="flex-shrink-0" href="/">
                                <img
                                    className="h-8 w-8"
                                    src="stat.svg"
                                    alt="Workflow"
                                />
                            </a>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link key={props.links[0].label} href={props.links[0].link || "#"}>
                                        <h1 className="font-bold text-blue-400 text-md"> Toolkit for Online Community Analytics </h1>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {props.links.map((link) => {
                                        return (
                                            <Link key={link.label} to={link.link || "#"}>
                                                <div
                                                    key={link.label}
                                                    className={`${
                                                        link.isSelected
                                                            ? "text-gray-800 dark:text-white"
                                                            : "text-gray-300"
                                                    }  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md ${
                                                        props.isFat ? "text-md" : "text-sm"
                                                    } font-medium`}
                                                >
                                                    {link.label}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`text-gray-800 hover:text-gray-400 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none`}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="h-8 w-8"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {(isMenuOpen || props.forceMenuOpenInMobile) && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {props.links.map((link) => {
                                return (
                                    <Link key={link.label} href={link.link || "#"}>
                                        <div
                                            className={`${
                                                link.isSelected
                                                    ? "text-gray-800 dark:text-white"
                                                    : "text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                            } block px-3 py-2 rounded-md text-base font-medium`}
                                        >
                                            {link.label}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};
export default Header;
