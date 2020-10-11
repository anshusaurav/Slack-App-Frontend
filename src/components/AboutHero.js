import React from 'react'

export default function AboutHero() {
    return (
        <div
            className="py-20"
            style={{ backgroundImage: `url("${require('./../svgs/pattern-light.svg')}"), linear-gradient(90deg, #394681 0%, #2f2040 100%)` }}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-2 leading-10 md:mb-4 text-white">
                    Product Tour
                </h2>
                <h3 className="text-2xl mb-2 leading-8 text-gray-200">
                    Pupbot simplify workflows. Set up standups, surveys, and more, in seconds.
                        </h3>
            </div>
        </div>
    )
}
