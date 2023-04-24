const Wrapper = styled.div`
  background: #f2f1ea;
  padding: 192px 24px;

  @media (max-width: 1000px) {
    padding: 112px 24px;
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Logo = styled.div`
  height: 32px;
  svg {
    height: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 72px;
  max-width: 1040px;
  margin: 0 auto;
`;

const LogoAndIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 72px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 72px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  a {
    display: block;
    transition: all 200ms;

    &:hover,
    &:focus {
      opacity: 0.7;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    gap: 24px;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ul {
    display: grid;
    list-style: none;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  a {
    font-family: "FK Grotesk", sans-serif;
    font-size: 13px;
    line-height: 1.2;
    font-weight: 400;
    color: #000;

    &:hover,
    &:focus,
    &:active {
      color: #000;
      text-decoration: underline;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

return (
  <Wrapper>
    <Container>
      <LogoAndIcons>
        <Logo>
          <svg viewBox="0 0 128 32" fill="none">
            <path
              d="M52.6979 4.94885C50.35 4.94885 48.6434 5.50114 47.1923 6.77897L44.6324 8.98811C44.4204 9.15596 43.991 9.28591 43.6921 9.03142C43.3932 8.77694 43.3497 8.43582 43.6051 8.09471L44.9693 6.05342C45.1813 5.75562 45.0128 5.37119 44.6269 5.37119H41.3442C40.9583 5.37119 40.6594 5.66899 40.6594 6.05342V25.9465C40.6594 26.3309 40.9583 26.6287 41.3442 26.6287H44.7574C45.1433 26.6287 45.4422 26.3309 45.4422 25.9465V14.7275C45.4422 9.58371 49.7522 8.77694 51.3718 8.77694C54.8285 8.77694 56.0622 11.2406 56.0622 13.114V25.9519C56.0622 26.3363 56.3611 26.6341 56.747 26.6341H60.1602C60.5461 26.6341 60.845 26.3363 60.845 25.9519V12.6917C60.845 7.93227 57.7308 4.95427 52.6979 4.95427V4.94885Z"
              fill="black"
            />
            <path
              d="M74.7533 4.86223C68.1388 4.86223 63.9158 8.90148 63.9158 14.381V17.3969C63.9158 23.1797 68.1388 27.1323 74.7533 27.1323C80.5959 27.1323 84.6939 24.1164 85.1178 20.0338C85.1613 19.606 84.8624 19.3137 84.433 19.3137H81.1068C80.8079 19.3137 80.5524 19.4815 80.4655 19.7793C80.0361 21.1384 78.036 23.1797 74.7478 23.1797C71.4596 23.1797 68.3889 20.7973 68.4323 17.3969L68.4758 13.6121C68.5193 10.7641 71.5031 8.80943 74.7478 8.80943C77.6936 8.80943 80.547 10.4663 80.8459 13.1844C80.8677 13.4984 80.6557 13.78 80.3405 13.845L70.7748 15.6967C70.3889 15.7834 70.09 16.1191 70.09 16.5468V16.5901C70.09 16.9746 70.4759 17.3103 71.0303 17.3103H84.7646C85.1396 17.3103 85.4494 17.0071 85.4494 16.628V13.9533C85.4494 8.89607 81.0579 4.85681 74.7424 4.85681L74.7533 4.86223Z"
              fill="black"
            />
            <path
              d="M98.5533 4.8623C93.2215 4.8623 88.6126 7.96484 88.6126 12.0474C88.6126 12.3885 88.9115 12.643 89.2974 12.643H92.7541C93.0965 12.643 93.3519 12.3885 93.3954 12.0474C93.7378 10.1794 95.9988 8.81493 98.4283 8.81493C101.331 8.81493 103.293 10.6017 103.293 13.661V17.3591C103.293 21.1439 100.477 23.0552 96.9771 23.0552C94.2487 23.0552 92.6671 22.0373 92.6671 20.375C92.6671 18.9293 93.4335 17.6948 96.5912 16.9747L101.157 15.7401C101.624 15.6102 101.798 15.2312 101.711 14.8034C101.668 14.4623 101.287 14.2945 100.945 14.2945H96.2108C92.1997 14.2945 88.1506 16.8447 88.1506 20.5862V21.1818C88.1506 25.0044 91.7758 27.0024 95.9173 27.0024C98.5641 27.0024 100.825 25.9845 102.233 24.7933L104.325 23.0065C104.668 22.7087 105.01 22.7087 105.309 23.0065C105.564 23.261 105.477 23.6454 105.266 23.9432L103.988 25.9412C103.776 26.239 103.945 26.6234 104.331 26.6234H107.401C107.787 26.6234 108.086 26.3256 108.086 25.9412V13.0653C108.086 8.13269 104.548 4.8623 98.575 4.8623H98.5533Z"
              fill="black"
            />
            <path
              d="M126.495 5.37118H121.717C120.054 5.37118 118.435 6.38912 117.282 7.36915L115.407 8.98269C115.195 9.15054 114.809 9.28049 114.554 9.06932C114.255 8.85815 114.125 8.4304 114.385 8.08929L115.75 6.048C115.962 5.7502 115.793 5.36577 115.407 5.36577H112.206C111.82 5.36577 111.521 5.66357 111.521 6.048V25.9411C111.521 26.3255 111.82 26.6233 112.206 26.6233H115.706C116.092 26.6233 116.391 26.3255 116.391 25.9411V15.74C116.391 11.3651 118.185 9.40502 122.065 9.40502H126.5C126.886 9.40502 127.185 9.10722 127.185 8.72279V6.04259C127.185 5.65815 126.886 5.36035 126.5 5.36035L126.495 5.37118Z"
              fill="black"
            />
            <path
              d="M28.6969 0C27.5066 0 26.4033 0.617259 25.7783 1.62437L19.0661 11.5547C18.8487 11.8795 18.9356 12.3235 19.2671 12.5401C19.5335 12.7188 19.8867 12.6971 20.1259 12.486L26.7349 6.77361C26.8436 6.67614 27.0121 6.68697 27.1153 6.79526C27.1588 6.84399 27.186 6.90897 27.186 6.97394V24.8528C27.186 24.999 27.0664 25.1181 26.9197 25.1181C26.8381 25.1181 26.7675 25.0856 26.7131 25.0206L6.73399 1.20745C6.08179 0.443993 5.12522 0 4.11975 0H3.42406C1.53268 0 0 1.5269 0 3.41117V28.5943C0 30.4785 1.53268 32.0054 3.42406 32.0054C4.61433 32.0054 5.71764 31.3882 6.34267 30.3811L13.0549 20.4508C13.2723 20.1259 13.1854 19.6819 12.8593 19.4653C12.5929 19.2866 12.2397 19.3083 12.0005 19.5195L5.39154 25.2318C5.28284 25.3293 5.11435 25.3184 5.01109 25.2102C4.96761 25.1614 4.94043 25.0965 4.94043 25.0315V7.13638C4.94043 6.99019 5.06 6.87107 5.20675 6.87107C5.28828 6.87107 5.35893 6.90355 5.41328 6.96853L25.387 30.798C26.0392 31.5614 26.9903 32.0054 28.0012 32.0054H28.6969C30.5883 32.0054 32.121 30.4839 32.121 28.5997V3.41117C32.121 1.5269 30.5883 0 28.6969 0Z"
              fill="black"
            />
          </svg>
        </Logo>

        <Icons>
          <a
            href="http://near.chat/"
            target="_blank"
            title="Official Discord server"
          >
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <path
                d="M22.044 2.12625C22.044 2.12625 22.044 2.12625 21.9998 2.12625C20.3188 1.36632 18.5494 0.859702 16.7357 0.564174C16.6914 0.521956 16.6472 0.564174 16.6472 0.564174C16.3818 0.986356 16.1606 1.45076 15.9837 1.87294C13.993 1.57741 12.0024 1.57741 10.0118 1.87294C9.83486 1.45076 9.61368 0.986356 9.34827 0.564174C9.34827 0.564174 9.30403 0.521956 9.2598 0.564174C7.44612 0.859702 5.67668 1.36632 3.99571 2.12625C3.95147 2.12625 3.95147 2.12625 3.95147 2.12625C0.589536 6.93913 -0.339421 11.6254 0.10294 16.2694C0.10294 16.2694 0.10294 16.3116 0.147176 16.3116C2.09356 17.7048 4.30536 18.7602 6.64987 19.4357C6.64987 19.478 6.69411 19.4357 6.73834 19.4357C7.22494 18.7602 7.6673 18.0848 8.06542 17.367C8.06542 17.3248 8.06542 17.2826 8.02119 17.2404C7.31341 16.9871 6.60563 16.6915 5.98633 16.3116C5.94209 16.3116 5.89786 16.2271 5.98633 16.1849C6.11904 16.1005 6.25175 16.0161 6.38445 15.8894C6.38445 15.8894 6.42869 15.8894 6.47293 15.8894C10.7196 17.747 15.3201 17.747 19.5226 15.8894C19.5668 15.8894 19.5668 15.8894 19.611 15.8894C19.7437 16.0161 19.8764 16.1005 20.0091 16.1849C20.0534 16.2271 20.0534 16.3116 20.0091 16.3116C19.3456 16.6915 18.6821 16.9871 17.9743 17.2404C17.9301 17.2826 17.9301 17.3248 17.9301 17.367C18.3282 18.0848 18.7705 18.7602 19.2571 19.4357C19.3014 19.4357 19.3014 19.478 19.3456 19.4357C21.6901 18.7602 23.9019 17.7048 25.8483 16.3116C25.8925 16.3116 25.8925 16.2694 25.8925 16.2694C26.4234 10.9076 24.9636 6.26364 22.044 2.12625ZM8.68473 13.4407C7.40188 13.4407 6.34022 12.3009 6.34022 10.9499C6.34022 9.55666 7.40188 8.45899 8.68473 8.45899C10.0118 8.45899 11.0292 9.55666 11.0292 10.9499C11.0292 12.3009 9.96757 13.4407 8.68473 13.4407ZM17.3108 13.4407C16.0279 13.4407 15.0105 12.3009 15.0105 10.9499C15.0105 9.55666 16.0279 8.45899 17.3108 8.45899C18.6378 8.45899 19.6995 9.55666 19.6553 10.9499C19.6553 12.3009 18.6378 13.4407 17.3108 13.4407Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://gov.near.org/"
            target="_blank"
            title="NEAR Governance Forum"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.8709 0.772705C5.43425 0.772705 0 5.73476 0 11.8496C0 12 0 23.2273 0 23.2273H11.8709C18.3604 23.2273 23.6364 18.1148 23.6364 12C23.6364 5.93525 18.3604 0.772705 11.8709 0.772705ZM11.8182 18.4156C10.763 18.4156 9.81331 18.2151 8.9164 17.8141L4.64286 18.8165L5.85633 15.0574C5.32873 14.1552 5.06494 13.1528 5.06494 12C5.06494 8.49146 8.07224 5.58439 11.8182 5.58439C15.5114 5.58439 18.5714 8.49146 18.5714 12C18.5714 15.5586 15.5114 18.4156 11.8182 18.4156Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://twitter.com/nearprotocol"
            target="_blank"
            title="Official Twitter account"
          >
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M23.9906 6.34576C25.0082 5.53415 25.924 4.56022 26.6364 3.42396C25.7205 3.85682 24.652 4.18147 23.5835 4.28968C24.7029 3.58629 25.517 2.50414 25.924 1.15146C24.9064 1.80074 23.7362 2.28771 22.5659 2.55825C21.5483 1.42199 20.1745 0.772705 18.6481 0.772705C15.697 0.772705 13.3056 3.31575 13.3056 6.45398C13.3056 6.88683 13.3565 7.31969 13.4583 7.75255C9.03167 7.48202 5.06298 5.20951 2.41719 1.80074C1.95926 2.61235 1.70486 3.58629 1.70486 4.66843C1.70486 6.6163 2.62071 8.34773 4.09625 9.37577C3.23128 9.32166 2.36631 9.10524 1.65398 8.67238V8.72648C1.65398 11.486 3.48568 13.7585 5.92795 14.2995C5.52091 14.4078 5.0121 14.516 4.55418 14.516C4.19801 14.516 3.89273 14.4619 3.53656 14.4078C4.19801 16.6803 6.18236 18.3035 8.52286 18.3576C6.69116 19.8726 4.40153 20.7924 1.90838 20.7924C1.45046 20.7924 1.04341 20.7383 0.636368 20.6842C2.97688 22.3074 5.77531 23.2273 8.82815 23.2273C18.6481 23.2273 23.9906 14.6242 23.9906 7.10326C23.9906 6.83273 23.9906 6.6163 23.9906 6.34576Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://github.com/near"
            target="_blank"
            title="Official Github organization"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M8.49926 19.2153C8.49926 19.1177 8.40395 19.0201 8.26099 19.0201C8.11802 19.0201 8.02272 19.1177 8.02272 19.2153C8.02272 19.3129 8.11802 19.4105 8.26099 19.3617C8.40395 19.3617 8.49926 19.3129 8.49926 19.2153ZM7.02198 18.9713C7.02198 19.0689 7.11729 19.2153 7.26025 19.2153C7.35556 19.2641 7.49852 19.2153 7.54618 19.1177C7.54618 19.0201 7.49852 18.9225 7.35556 18.8736C7.2126 18.8248 7.06964 18.8736 7.02198 18.9713ZM9.16641 18.9225C9.02345 18.9225 8.92814 19.0201 8.92814 19.1665C8.92814 19.2641 9.0711 19.3129 9.21407 19.2641C9.35703 19.2153 9.45234 19.1665 9.40468 19.0689C9.40468 18.9713 9.26172 18.8736 9.16641 18.9225ZM12.2639 0.181763C5.68767 0.181763 0.636353 5.35497 0.636353 12.0899C0.636353 17.5071 3.92448 22.1435 8.68987 23.8028C9.30937 23.9004 9.49999 23.51 9.49999 23.2172C9.49999 22.8756 9.49999 21.2162 9.49999 20.1914C9.49999 20.1914 6.16421 20.9234 5.4494 18.7272C5.4494 18.7272 4.92521 17.3119 4.16275 16.9703C4.16275 16.9703 3.0667 16.1894 4.2104 16.1894C4.2104 16.1894 5.40175 16.287 6.0689 17.4583C7.11729 19.3617 8.83283 18.8248 9.54764 18.4832C9.64295 17.7024 9.92888 17.1655 10.3101 16.8239C7.64149 16.5311 4.92521 16.1406 4.92521 11.4555C4.92521 10.089 5.30644 9.4545 6.0689 8.57603C5.92594 8.2344 5.54471 6.9655 6.21187 5.25737C7.16495 4.96454 9.49999 6.57507 9.49999 6.57507C10.4531 6.28225 11.4538 6.18464 12.4545 6.18464C13.5029 6.18464 14.5037 6.28225 15.4567 6.57507C15.4567 6.57507 17.7441 4.91574 18.7449 5.25737C19.412 6.9655 18.9831 8.2344 18.8878 8.57603C19.6503 9.4545 20.1268 10.089 20.1268 11.4555C20.1268 16.1406 17.3152 16.5311 14.6466 16.8239C15.0755 17.2143 15.4567 17.9464 15.4567 19.1177C15.4567 20.7282 15.4091 22.778 15.4091 23.1684C15.4091 23.51 15.6474 23.9004 16.2669 23.754C21.0322 22.1435 24.2727 17.5071 24.2727 12.0899C24.2727 5.35497 18.8878 0.181763 12.2639 0.181763ZM5.25879 17.0191C5.16348 17.0679 5.21113 17.2143 5.25879 17.3119C5.35409 17.3607 5.4494 17.4095 5.54471 17.3607C5.59236 17.3119 5.59236 17.1655 5.49706 17.0679C5.40175 17.0191 5.30644 16.9703 5.25879 17.0191ZM4.73459 16.6287C4.68694 16.7263 4.73459 16.7751 4.8299 16.8239C4.92521 16.8727 5.02052 16.8727 5.06817 16.7751C5.06817 16.7263 5.02052 16.6775 4.92521 16.6287C4.8299 16.5799 4.78225 16.5799 4.73459 16.6287ZM6.25952 18.3856C6.21187 18.4344 6.21187 18.5808 6.35483 18.6784C6.45014 18.776 6.5931 18.8248 6.64075 18.7272C6.68841 18.6784 6.68841 18.532 6.5931 18.4344C6.49779 18.3368 6.35483 18.288 6.25952 18.3856ZM5.73533 17.6536C5.64002 17.7024 5.64002 17.8488 5.73533 17.9464C5.83063 18.044 5.92594 18.0928 6.02125 18.044C6.0689 17.9952 6.0689 17.8488 6.02125 17.7512C5.92594 17.6536 5.83063 17.6047 5.73533 17.6536Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://t.me/cryptonear"
            target="_blank"
            title="Official Telegram channel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12.0909 0.181763C5.56229 0.181763 0.272705 5.47135 0.272705 11.9999C0.272705 18.5285 5.56229 23.8181 12.0909 23.8181C18.6195 23.8181 23.9091 18.5285 23.9091 11.9999C23.9091 5.47135 18.6195 0.181763 12.0909 0.181763ZM17.857 8.28294L15.9509 17.4325C15.8079 18.0997 15.4267 18.2426 14.8548 17.9567L11.9003 15.7646L10.4707 17.1466C10.3277 17.2895 10.1847 17.4325 9.89881 17.4325L10.0894 14.4303L15.5696 9.47429C15.8079 9.28367 15.522 9.14071 15.1884 9.33132L8.42153 13.6202L5.51464 12.7148C4.89514 12.5241 4.89514 12.0476 5.6576 11.7617L17.0469 7.37751C17.5711 7.1869 18.0476 7.52047 17.857 8.28294Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://pages.near.org/wechat"
            target="_blank"
            title="Official WeChat community"
          >
            <svg width="27" height="22" viewBox="0 0 27 22" fill="none">
              <path
                d="M18.4945 7.04003C18.7781 7.04003 19.0618 7.04003 19.3927 7.08478C18.5891 3.5946 14.6181 0.95459 10.08 0.95459C5.02178 0.95459 0.909058 4.22104 0.909058 8.38241C0.909058 10.7539 2.27997 12.7228 4.54906 14.2441L3.65088 16.8841L6.86542 15.3628C8.04724 15.5865 8.94542 15.8102 10.08 15.8102C10.4109 15.8102 10.6472 15.7655 10.9781 15.7655C10.7891 15.1838 10.6472 14.5573 10.6472 13.9309C10.6472 10.1275 14.0981 7.04003 18.4945 7.04003ZM13.5309 4.6685C14.24 4.6685 14.6654 5.11596 14.6654 5.78715C14.6654 6.41359 14.24 6.86105 13.5309 6.86105C12.8218 6.86105 12.16 6.41359 12.16 5.78715C12.16 5.11596 12.8691 4.6685 13.5309 4.6685ZM7.10179 6.86105C6.39269 6.86105 5.73088 6.41359 5.73088 5.78715C5.73088 5.11596 6.39269 4.6685 7.10179 4.6685C7.81088 4.6685 8.23633 5.11596 8.23633 5.78715C8.23633 6.41359 7.81088 6.86105 7.10179 6.86105ZM26.9091 13.8414C26.9091 10.3512 23.2218 7.53224 19.0618 7.53224C14.6654 7.53224 11.2618 10.3512 11.2618 13.8414C11.2618 17.3316 14.7127 20.1506 19.0618 20.1506C19.96 20.1506 20.9054 19.9268 21.8509 19.7031L24.3563 21.0455L23.6472 18.8529C25.5381 17.5553 26.9091 15.8102 26.9091 13.8414ZM16.5091 12.7228C16.0836 12.7228 15.6109 12.32 15.6109 11.8726C15.6109 11.4251 16.0836 10.9777 16.5091 10.9777C17.2181 10.9777 17.6909 11.4251 17.6909 11.8726C17.6909 12.32 17.2181 12.7228 16.5091 12.7228ZM21.6145 12.7228C21.1418 12.7228 20.6691 12.32 20.6691 11.8726C20.6691 11.4251 21.1418 10.9777 21.6145 10.9777C22.2763 10.9777 22.7491 11.4251 22.7491 11.8726C22.7491 12.32 22.2763 12.7228 21.6145 12.7228Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw"
            target="_blank"
            title="Official YouTube channel"
          >
            <svg width="27" height="18" viewBox="0 0 27 18" fill="none">
              <path
                d="M26.3387 2.9524C26.0535 1.84445 25.1504 0.967318 24.0571 0.69033C22.0133 0.136353 13.9328 0.136353 13.9328 0.136353C13.9328 0.136353 5.80485 0.136353 3.76098 0.69033C2.66774 0.967318 1.76463 1.84445 1.47944 2.9524C0.909058 4.89132 0.909058 9.04615 0.909058 9.04615C0.909058 9.04615 0.909058 13.1548 1.47944 15.1399C1.76463 16.2479 2.66774 17.0788 3.76098 17.3558C5.80485 17.8636 13.9328 17.8636 13.9328 17.8636C13.9328 17.8636 22.0133 17.8636 24.0571 17.3558C25.1504 17.0788 26.0535 16.2479 26.3387 15.1399C26.9091 13.1548 26.9091 9.04615 26.9091 9.04615C26.9091 9.04615 26.9091 4.89132 26.3387 2.9524ZM11.271 12.7855V5.30681L18.0206 9.04615L11.271 12.7855Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://www.reddit.com/r/nearprotocol/"
            target="_blank"
            title="Official Subreddit"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.9091 12C24.9091 18.627 19.5361 24 12.9091 24C6.28206 24 0.909058 18.627 0.909058 12C0.909058 5.373 6.28206 0 12.9091 0C19.5361 0 24.9091 5.373 24.9091 12ZM20.5971 11.058C20.7911 11.335 20.9011 11.662 20.9131 12C20.9183 12.3307 20.8298 12.6561 20.6578 12.9385C20.4857 13.221 20.2373 13.4489 19.9411 13.596C19.9551 13.772 19.9551 13.948 19.9411 14.124C19.9411 16.812 16.8091 18.996 12.9451 18.996C9.08106 18.996 5.94906 16.812 5.94906 14.124C5.93555 13.9483 5.93555 13.7717 5.94906 13.596C5.72023 13.4889 5.51731 13.3335 5.35425 13.1405C5.19118 12.9475 5.07184 12.7215 5.00443 12.478C4.93702 12.2345 4.92313 11.9793 4.96373 11.7299C5.00432 11.4805 5.09843 11.2429 5.23959 11.0333C5.38075 10.8238 5.56561 10.6473 5.78147 10.516C5.99732 10.3847 6.23905 10.3016 6.49004 10.2726C6.74103 10.2436 6.99532 10.2693 7.23544 10.3479C7.47556 10.4265 7.69581 10.5562 7.88106 10.728C9.26378 9.79023 10.8905 9.27718 12.5611 9.252L13.4491 5.088C13.459 5.03979 13.4785 4.99405 13.5063 4.95341C13.534 4.91277 13.5696 4.87805 13.6109 4.85127C13.6522 4.82448 13.6984 4.80615 13.7468 4.79735C13.7953 4.78855 13.845 4.78945 13.8931 4.8L16.8331 5.388C16.9766 5.14132 17.2034 4.9539 17.4727 4.85937C17.742 4.76484 18.0362 4.7694 18.3025 4.87222C18.5687 4.97505 18.7896 5.1694 18.9255 5.42041C19.0614 5.67141 19.1033 5.96262 19.0438 6.24177C18.9843 6.52092 18.8273 6.76972 18.6009 6.94352C18.3745 7.11732 18.0936 7.20473 17.8085 7.19006C17.5235 7.1754 17.253 7.05962 17.0456 6.8635C16.8383 6.66739 16.7076 6.40378 16.6771 6.12L14.1091 5.58L13.3291 9.324C14.9793 9.3594 16.584 9.87206 17.9491 10.8C18.1313 10.6248 18.3493 10.4911 18.5881 10.4082C18.8269 10.3252 19.0808 10.295 19.3324 10.3195C19.5841 10.344 19.8274 10.4227 20.0457 10.5502C20.264 10.6777 20.4521 10.8509 20.5971 11.058ZM9.11506 12.533C9.02747 12.6641 8.96655 12.8111 8.93578 12.9657C8.90501 13.1203 8.90499 13.2794 8.93573 13.4341C8.9978 13.7463 9.18137 14.0211 9.44606 14.198C9.71074 14.3749 10.0349 14.4394 10.3471 14.3773C10.5017 14.3466 10.6488 14.2857 10.7798 14.1981C10.9109 14.1106 11.0235 13.9981 11.1111 13.867C11.288 13.6023 11.3525 13.2782 11.2904 12.9659C11.2283 12.6537 11.0447 12.3789 10.7801 12.202C10.5154 12.0251 10.1913 11.9606 9.87901 12.0227C9.56676 12.0847 9.29196 12.2683 9.11506 12.533ZM12.9211 17.424C13.9861 17.468 15.0341 17.19 15.8851 16.548C15.9487 16.4859 15.9851 16.4011 15.9862 16.3122C15.9874 16.2234 15.9531 16.1377 15.8911 16.074C15.8603 16.0425 15.8237 16.0173 15.7832 16C15.7428 15.9826 15.6993 15.9734 15.6553 15.9728C15.5664 15.9717 15.4807 16.0059 15.4171 16.068C14.6888 16.5904 13.804 16.8487 12.9091 16.8C12.0152 16.8399 11.1345 16.5732 10.4131 16.044C10.3509 15.993 10.272 15.9669 10.1916 15.9708C10.1113 15.9748 10.0353 16.0085 9.9784 16.0653C9.92153 16.1222 9.88784 16.1982 9.8839 16.2786C9.87995 16.3589 9.90603 16.4378 9.95706 16.5C10.8084 17.1416 11.8559 17.4681 12.9211 17.424ZM15.0021 14.246C15.2001 14.378 15.4201 14.496 15.6571 14.496C15.8198 14.4979 15.9813 14.4666 16.1315 14.4041C16.2818 14.3416 16.4178 14.2492 16.5312 14.1324C16.6446 14.0156 16.733 13.877 16.7911 13.725C16.8492 13.5729 16.8757 13.4106 16.8691 13.248C16.869 13.0407 16.8152 12.837 16.713 12.6567C16.6108 12.4763 16.4636 12.3256 16.2858 12.219C16.108 12.1125 15.9056 12.0539 15.6984 12.0488C15.4912 12.0437 15.2862 12.0924 15.1034 12.1902C14.9205 12.2879 14.7662 12.4313 14.6553 12.6064C14.5444 12.7815 14.4807 12.9824 14.4705 13.1894C14.4603 13.3964 14.5039 13.6026 14.5971 13.7877C14.6902 13.9729 14.8297 14.1308 15.0021 14.246Z"
                fill="#262626"
              />
            </svg>
          </a>
        </Icons>
      </LogoAndIcons>

      <LinkGrid>
        <div>
          <Text size="16px" weight="500">
            Learn
          </Text>
          <ul>
            <li>
              <a href="/learn">The basics</a>
            </li>
            <li>
              <a href="https://pages.near.org/learn/learn-more">
                All learning resources
              </a>
            </li>
            <li>
              <a href="https://wiki.near.org/">Near Wiki</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            Use
          </Text>
          <ul>
            <li>
              <a href="/use#set-up-account">Account Setup</a>
            </li>
            <li>
              <a href="/use#explore-dapps">Examples of dApps</a>
            </li>
            <li>
              <a href="https://near.org/contribut3.near/widget/Index">NEAR Projects</a>
            </li>
            <li>
              <a href="/use#why-it-matters">Why it matters</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            Ecosystem
          </Text>
          <ul>
            <li>
              <a href="/ecosystem">Overview</a>
            </li>
            <li>
              <a href="/ecosystem/get-funding">Get Funding</a>
            </li>
            <li>
              <a href="/ecosystem/work-and-earn">Work & Earn</a>
            </li>
            <li>
              <a href="/ecosystem/community">Community</a>
            </li>
            <li>
              <a href="https://near.events/">Events</a>
            </li>
            <li>
              <a href="https://gov.near.org/">Gov Forum</a>
            </li>
            <li>
              <a href="https://medium.com/nearprotocol">Community Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            Developers
          </Text>
          <ul>
            <li>
              <a href="https://pages.near.org/developers/">Overview</a>
            </li>
            <li>
              <a href="https://pages.near.org/developers/get-help/">Get Help</a>
            </li>
            <li>
              <a href="https://docs.near.org/">Near Docs</a>
            </li>
            <li>
              <a href="https://github.com/near">Near Github</a>
            </li>
            <li>
              <a href="https://aurora.dev/">Aurora (EVM)</a>
            </li>
            <li>
              <a href="https://www.neardevgov.org/">Dev Governance</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            About
          </Text>
          <ul>
            <li>
              <a href="/about">Overview</a>
            </li>
            <li>
              <a href="https://pages.near.org/blog/">Blog</a>
            </li>
            <li>
              <a href="https://pages.near.org/about/network/">Network</a>
            </li>
            <li>
              <a href="https://pages.near.org/about/press-center/">
                Press Center
              </a>
            </li>
            <li>
              <a href="https://pages.near.org/about/brand/">Brand Toolkit</a>
            </li>
            <li>
              <a href="https://careers.near.org/jobs">Careers</a>
            </li>
            <li>
              <a href="https://pages.near.org/about/contact-us/">Contact Us</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            User Tools
          </Text>
          <ul>
            <li>
              <a href="https://wallet.near.org/">Near Wallet</a>
            </li>
            <li>
              <a href="https://explorer.near.org/">Near Explorer</a>
            </li>
            <li>
              <a href="https://stats.gallery/">Stats.gallery</a>
            </li>
            <li>
              <a href="https://pages.near.org/bridge/">
                ETH {`<>`} Near Bridge
              </a>
            </li>
          </ul>

          <Text size="16px" weight="500">
            Dev Tools
          </Text>
          <ul>
            <li>
              <a href="https://docs.near.org/tools/near-cli">Near CLI</a>
            </li>
            <li>
              <a href="https://docs.near.org/develop/quickstart-guide">
                Javascript SDK
              </a>
            </li>
            <li>
              <a href="https://github.com/near/near-sdk-rs">Rust SDK</a>
            </li>
            <li>
              <a href="https://docs.near.org/tools/near-api-js/cookbook">
                Javascript API
              </a>
            </li>
          </ul>
        </div>
      </LinkGrid>
    </Container>
  </Wrapper>
);
