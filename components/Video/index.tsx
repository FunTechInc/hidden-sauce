export interface VideoProps
   extends React.VideoHTMLAttributes<HTMLVideoElement> {
   fill?: boolean;
   ref?: React.Ref<HTMLVideoElement>;
}

export const Video = ({ fill, ref, style, ...rest }: VideoProps) => {
   return (
      <video
         ref={ref}
         style={
            fill
               ? {
                    ...{
                       position: "absolute",
                       width: "100%",
                       height: "100%",
                       inset: 0,
                       color: "transparent",
                    },
                    ...style,
                 }
               : style
         }
         {...rest}
      />
   );
};
