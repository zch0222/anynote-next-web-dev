'use client'
import { useTheme } from "next-themes";

export default function Mooc(props: {
    width: number,
    height: number
}) {

    const {theme} = useTheme()

    return (
        <svg
            style={{
                color: 'var(--color-text)'
            }}
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4055"
            width={props.width}
            height={props.height}
        >
            <path fill={theme === 'dark' ? 'white' : 'black'} d="M717.12 274H762c82.842 0 150 67.158 150 150v200c0 82.842-67.158 150-150 150H262c-82.842 0-150-67.158-150-150V424c0-82.842 67.158-150 150-150h44.88l-18.268-109.602c-4.086-24.514 12.476-47.7 36.99-51.786 24.514-4.086 47.7 12.476 51.786 36.99l20 120c0.246 1.472 0.416 2.94 0.516 4.398h228.192c0.1-1.46 0.27-2.926 0.516-4.398l20-120c4.086-24.514 27.272-41.076 51.786-36.99 24.514 4.086 41.076 27.272 36.99 51.786L717.12 274zM262 364c-33.138 0-60 26.862-60 60v200c0 33.138 26.862 60 60 60h500c33.138 0 60-26.862 60-60V424c0-33.138-26.862-60-60-60H262z m50 548c-24.852 0-45-20.148-45-45S287.148 822 312 822h400c24.852 0 45 20.148 45 45S736.852 912 712 912H312z m-4-428c0-24.852 20.148-45 45-45S398 459.148 398 484v40c0 24.852-20.148 45-45 45S308 548.852 308 524v-40z m318 0c0-24.852 20.148-45 45-45S716 459.148 716 484v40c0 24.852-20.148 45-45 45S626 548.852 626 524v-40z" p-id="7667"></path>
        </svg>
    )
}


export function getMoocSVG(width: number, height: number) {

    return function MoocSVG() {
        return (
            <svg
                style={{
                    color: 'var(--color-text)'
                }}
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4055"
                width={width}
                height={height}
            >
                <path fill='black'
                    d="M695.978667 147.968H278.528c-47.616 0-86.528 37.546667-86.528 83.626667v703.146666c0 10.24 4.608 19.797333 12.458667 26.282667 6.144 5.12 13.824 7.850667 21.674666 7.850667 2.218667 0 4.266667-0.170667 6.485334-0.682667l480.256-93.013333a34.133333 34.133333 0 0 0 26.965333-39.936c-3.584-18.432-21.504-30.72-39.936-26.965334l-439.637333 85.162667V231.594667c0-8.533333 8.192-15.36 18.261333-15.36h417.450667c67.754667 0 123.050667 51.370667 123.050666 114.517333v603.989333c0 18.773333 15.36 34.133333 34.133334 34.133334s34.133333-15.36 34.133333-34.133334V330.752c0-100.864-85.845333-182.784-191.317333-182.784z" p-id="5277"></path>
                <path fill='black'
                    d="M513.877333 377.344a56.2176 56.2176 0 0 0-58.197333-3.072c-18.432 9.898667-30.037333 29.013333-30.037333 49.834667v220.842666c0 20.992 11.434667 40.106667 30.037333 49.834667 8.192 4.437333 17.237333 6.656 26.282667 6.656 11.264 0 22.528-3.413333 32.597333-10.069333l144.725333-103.253334a64.9216 64.9216 0 0 0 28.501334-53.589333c0-21.333333-10.410667-41.130667-27.989334-53.248l-145.92-103.936z m-19.968 244.736V446.976l122.709334 87.552-122.709334 87.552z" p-id="5278"></path>
            </svg>
        )
    }
}


