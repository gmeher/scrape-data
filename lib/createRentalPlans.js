function createRentalPlans(rental_plans) {
    return rental_plans.map(rental_plan => {
        return {
            id: rental_plan.id,
            rental_plan_price_int: rental_plan.rental_plan_price_cents * 80 / 100,
            rental_plan_price_string: Intl.NumberFormat('en-IN').format(rental_plan.rental_plan_price_cents * 80 / 100),
            old_price_int: rental_plan.old_price * 80 / 100,
            old_price_string: Intl.NumberFormat('en-IN').format(rental_plan.old_price * 80 / 100),
            item_condition_name: rental_plan.item_condition_name,
            minimum_term_months: rental_plan.minimum_term_months,
        };
    });
}
exports.createRentalPlans = createRentalPlans;