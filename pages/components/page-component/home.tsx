import { useSession } from "next-auth/client";
import styled from "styled-components";

const IntroPage = styled.div`
  .intro__page {
    align-items: center;
    text-align: center;
    color: black;
    font-family: Helvetica;
    font-weight: 300;
    margin: 30px;

    .__intro__title {
      margin-right: auto;
      font-size: 36px;
      font-weight: 600;
      padding: 12px 16px;
      color: #031323;
    }

    .__intro__body {
      font-size: 18px;
      color: black;
      margin-left: 150px;
      margin-right: 150px;
    }
  }
`;

export const Intro = () => {
  const [session, loading] = useSession();

  return (
    <IntroPage>
      <div className="intro__page">
        <div className="__intro__title">Project Distribution and Archive</div>
        <div className="__intro__body">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </div>
      </div>
    </IntroPage>
  );
};
