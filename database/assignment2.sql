-- 1) Insert record of Tony Stark

INSERT INTO public.account(
	account_firstname,
	account_lastname,
	account_email,
	account_password
)

VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2) Change Tony Stark Record to Admin

UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@stakent.com';

-- 3) Delete the Tony Stark Record

DELETE FROM public.account
WHERE account_email = 'tony@stakent.com';

-- 4) Replace "small interior" to "huge interior"

UPDATE public.inventory
SET inv_description = REPLACE (inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5) Show make, model, and classification name

SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c
ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6) Update invetory records

UPDATE public.inventory
SET inv_image = REPLACE (inv_image, '/images', '/images/vehicles/'),
	inv_thumbnail = REPLACE (inv_thumbnail, '/images', '/images/vehicles/');
