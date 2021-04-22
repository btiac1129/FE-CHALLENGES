const sortPromotionsData = (prop) => {
    // JSON 객체의 속성 중 prop 값을 기준으로 오름차순 정렬.
    return function(p, q) {
        if (p[prop] < q[prop]) return -1;
        else if (p[prop] > q[prop]) return 1;
        else if (p[prop] === q[prop]) return 0;
    };
};

const fetchPromotionsData = () => {
    const request = new Request("./data.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "default",
    });

    const response = fetch(request, {})
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            return new Error(error);
        });

    return response;
};

const createPromotions = async() => {
    const $promotions = document.querySelector(".promotions");

    const $active = document.querySelector(".active");
    let currentTabIndex = $active.getAttribute("data-index");

    try {
        // fetch Promotions Data
        const promotionsData = await fetchPromotionsData();

        // sort Promotions Data: DOM 생성 전, 데이터 상태일 때 미리 정렬.
        promotionsData.sort(sortPromotionsData("sequence"));

        // create Promotions (article elements)
        const promotions = promotionsData.map(
            ({
                id,
                name,
                description,
                heroImageUrl,
                onlyNewCustomers,
                termsAndConditionsButtonText,
                joinNowButtonText,
                sequence,
            }) => {
                return `<article id="${id}" data-only-new-customers="${onlyNewCustomers}" data-seqeunce="${sequence}">
                <img src="${heroImageUrl}">
                <div class="promo-body">
                    <h2 class="promo-name ft-dark">${name}</h2>
                    <p class="promo-description ft-dark">${description}</p>
                    <div class="promo-buttons">
                        <button data-index="0">
                            ${termsAndConditionsButtonText}
                        </button>
                        <button data-index="1">
                            ${joinNowButtonText}
                        </button>
                    </div>
                </div>
            </article>`;
            }
        );

        $promotions.innerHTML = promotions.join("");
    } catch (e) {
        console.error(e);
    }

    // tabs event onclick
    document.querySelector(".tabs").onclick = (() => {
        const $tabAll = document.querySelectorAll(".tab");
        const $articleAll = document.querySelectorAll("article");

        // create array for !NewCustomers
        let $exceptNewCustomers = [];
        $articleAll.forEach(($article) => {
            if ($article.dataset.onlyNewCustomers === "false") {
                $exceptNewCustomers.push($article);
            }
        });

        // e: tabs onclick event
        return (e) => {
            currentTabIndex = +e.target.dataset.index;
            $tabAll.forEach(($tab, idx) => {
                // active tab
                $tab.classList.toggle("active", currentTabIndex === idx);

                // when currentTabIndex is 1, set article.style.display "none" for only new Customers.
                // when currentTabIndex is 0, set article.style.display "block" for only new Customers again.
                if (currentTabIndex === 1) {
                    $exceptNewCustomers.forEach(($exceptNewCustomer) => {
                        $exceptNewCustomer.style.display = "none";
                    });
                } else if (currentTabIndex === 0) {
                    $exceptNewCustomers.forEach(($exceptNewCustomer) => {
                        $exceptNewCustomer.style.display = "block";
                    });
                }
            });
        };
    })();
};

document.addEventListener("DOMContentLoaded", createPromotions);